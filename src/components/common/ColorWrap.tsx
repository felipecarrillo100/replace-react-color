import React, { useState, useEffect, useCallback, ComponentType } from 'react'
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

    useEffect(() => {
      setState(color.toState(colorProp, state.oldHue))
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
        const colors = color.toState(data, data.h || state.oldHue)
        setState(colors)
        onChangeComplete && debouncedOnChangeComplete(onChangeComplete, colors, event)
        onChange && onChange(colors, event)
      }
    }, [onChange, onChangeComplete, state.oldHue, debouncedOnChangeComplete])

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
