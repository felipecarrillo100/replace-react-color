import React, { useState, useEffect, useCallback, useRef, ComponentType } from 'react'
import { debounce } from '../../helpers/utils'
import * as color from '../../helpers/color'
import { Color, ColorState } from '../../types'

export interface ColorWrapProps {
  color?: Color;
  onChange?: (color: ColorState, event: React.ChangeEvent<any> | MouseEvent | TouchEvent) => void;
  onChangeComplete?: (color: ColorState, event: React.ChangeEvent<any> | MouseEvent | TouchEvent) => void;
  onSwatchHover?: (color: ColorState, event: MouseEvent) => void;
}

export const ColorWrap = <P extends object>(Picker: ComponentType<P & ColorState & { onChange: any, onSwatchHover?: any }>) => {
  const ColorPicker: React.FC<Omit<P, keyof ColorState | 'onChange'> & ColorWrapProps> = (props) => {
    const { color: colorProp = { h: 250, s: 0.50, l: 0.20, a: 1 }, onChange, onChangeComplete, onSwatchHover, ...restProps } = props
    const [state, setState] = useState<ColorState>(() => color.toState(colorProp, 0))
    const latestAlpha = useRef(state.hsl.a)
    latestAlpha.current = state.hsl.a

    useEffect(() => {
      const nextState = color.toState(colorProp, state.oldHue)
      
      const hasAlpha = typeof colorProp === 'object' && ('a' in colorProp || (colorProp as any).alpha !== undefined)
      const isHex8 = typeof colorProp === 'string' && (colorProp.length === 5 || colorProp.length === 9)
      
      if (!hasAlpha && !isHex8) {
        nextState.hsl.a = latestAlpha.current
        nextState.rgb.a = latestAlpha.current
        nextState.hsv.a = latestAlpha.current
      }
      
      // Only update if it's actually different to avoid 'weirdness' from redundant updates
      if (nextState.hex !== state.hex || nextState.hsl.a !== state.hsl.a) {
        console.log('ColorWrap useEffect: syncing from props', { colorProp, prevAlpha: latestAlpha.current, nextAlpha: nextState.hsl.a })
        setState(nextState)
      }
    }, [colorProp])

    const debouncedOnChangeComplete = useCallback(
      debounce((fn: Function, data: any, event: any) => {
        fn(data, event)
      }, 100),
      []
    )

    const handleChange = useCallback((data: any, event: any) => {
      const isValidColor = color.simpleCheckForValidColor(data)
      if (isValidColor) {
        // If data is a string (e.g. from a swatch click), don't spread it.
        // Instead, wrap it in an object so we can safely merge the current alpha.
        const colorData = typeof data === 'string' ? { hex: data } : data
        const colors = color.toState({ a: state.hsl.a, ...colorData }, data.h || state.oldHue)
        console.log('ColorWrap handleChange:', { inputA: data.a, stateA: state.hsl.a, finalA: colors.hsl.a })
        setState(colors)
        onChangeComplete && debouncedOnChangeComplete(onChangeComplete, colors, event)
        onChange && onChange(colors, event)
      }
    }, [onChange, onChangeComplete, state.hsl.a, state.oldHue, debouncedOnChangeComplete])

    const handleSwatchHover = useCallback((data: any, event: any) => {
      const isValidColor = color.simpleCheckForValidColor(data)
      if (isValidColor) {
        const colors = color.toState(data, data.h || state.oldHue)
        onSwatchHover && onSwatchHover(colors, event)
      }
    }, [onSwatchHover, state.oldHue])

    const optionalEvents: any = {}
    if (onSwatchHover) {
      optionalEvents.onSwatchHover = handleSwatchHover
    }

    return (
      <Picker
        {...restProps as P}
        {...state}
        onChange={handleChange}
        {...optionalEvents}
      />
    )
  }

  return ColorPicker
}

export default ColorWrap
