import React, { useRef, FC } from 'react'
import * as alpha from '../../helpers/alpha'
import { useColorDrag } from '../../helpers/useColorDrag'
import { HSL, RGB } from '../../types'
import Checkboard from './Checkboard'

export interface AlphaProps {
  hsl: HSL;
  rgb: RGB;
  direction?: 'horizontal' | 'vertical';
  radius?: string | number;
  shadow?: string;
  onChange?: (color: any, e: React.MouseEvent | React.TouchEvent) => void;
  pointer?: FC<any>;
  renderers?: any;
  style?: {
    radius?: string | number;
    shadow?: string;
  };
  a?: number;
}

export const Alpha: FC<AlphaProps> = ({
  hsl,
  rgb,
  direction = 'horizontal',
  radius,
  shadow,
  onChange,
  pointer: Pointer,
  renderers,
  style = {},
  a
}) => {
  const { radius: styleRadius, shadow: styleShadow } = style;
  const activeRadius = styleRadius || radius;
  const activeShadow = styleShadow || shadow;
  const container = useRef<HTMLDivElement>(null)
  
  // Use refs for stable access to latest props in the drag callback
  const propsRef = useRef({ hsl, rgb, onChange, a })
  propsRef.current = { hsl, rgb, onChange, a }

  const { handleMouseDown, handleTouchStart } = useColorDrag(container, ({ e, container }) => {
    const { hsl, rgb, onChange, a } = propsRef.current
    const change = alpha.calculateChange(e, hsl, direction, a ?? rgb.a ?? 1, container)
    change && typeof onChange === 'function' && onChange(change, e)
  })

  const baseStyles: Record<string, React.CSSProperties> = {
    alpha: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      borderRadius: activeRadius,
    },
    checkboard: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      overflow: 'hidden',
      borderRadius: activeRadius,
    },
    gradient: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      background: direction === 'vertical' 
        ? `linear-gradient(to bottom, rgba(${rgb.r},${rgb.g},${rgb.b}, 0) 0%, rgba(${rgb.r},${rgb.g},${rgb.b}, 1) 100%)`
        : `linear-gradient(to right, rgba(${rgb.r},${rgb.g},${rgb.b}, 0) 0%, rgba(${rgb.r},${rgb.g},${rgb.b}, 1) 100%)`,
      boxShadow: activeShadow,
      borderRadius: activeRadius,
    },
    container: {
      position: 'relative',
      height: '100%',
      margin: '0 3px',
    },
    pointer: {
      position: 'absolute',
      ...(direction === 'vertical' ? {
        left: 0,
        top: `${(rgb.a ?? 1) * 100}%`,
      } : {
        left: `${(rgb.a ?? 1) * 100}%`,
      })
    },
    slider: {
      width: '4px',
      borderRadius: '1px',
      height: '8px',
      boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
      background: '#fff',
      marginTop: '1px',
      transform: 'translateX(-2px)',
    },
  }

  return (
    <div style={baseStyles.alpha}>
      <div style={baseStyles.checkboard}>
        <Checkboard renderers={renderers} />
      </div>
      <div style={baseStyles.gradient} />
      <div
        style={baseStyles.container}
        ref={container}
        onMouseDown={handleMouseDown}
        onTouchMove={handleTouchStart}
        onTouchStart={handleTouchStart}
      >
        <div style={baseStyles.pointer}>
          {Pointer ? (
            <Pointer rgb={rgb} hsl={hsl} direction={direction} radius={activeRadius} shadow={activeShadow} a={a} />
          ) : (
            <div style={baseStyles.slider} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Alpha
