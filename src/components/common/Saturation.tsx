import React, { FC, useRef } from 'react'
import * as saturation from '../../helpers/saturation'
import { useColorDrag } from '../../helpers/useColorDrag'
import { HSL, HSV } from '../../types'

export interface SaturationProps {
  hsl: HSL;
  hsv: HSV;
  onChange?: (color: any, e: any) => void;
  pointer?: FC<any>;
  radius?: string | number;
  shadow?: string;
  style?: {
    color?: React.CSSProperties;
    white?: React.CSSProperties;
    black?: React.CSSProperties;
    pointer?: React.CSSProperties;
    circle?: React.CSSProperties;
    radius?: string | number;
    shadow?: string;
  };
}

export const Saturation: FC<SaturationProps> = ({
  hsl,
  hsv,
  onChange,
  pointer: Pointer,
  radius,
  shadow,
  style = {}
}) => {
  const container = useRef<HTMLDivElement>(null)

  // Use refs for stable access to latest props in the drag callback
  const propsRef = useRef({ hsl, onChange })
  propsRef.current = { hsl, onChange }

  const { handleMouseDown, handleTouchStart } = useColorDrag(container, ({ e, container }) => {
    const { hsl, onChange } = propsRef.current
    const change = saturation.calculateChange(e, hsl, container)
    if (change && typeof onChange === 'function') {
      onChange(change, e)
    }
  })

  const { color: colorStyle, white, black, pointer, circle, radius: styleRadius, shadow: styleShadow } = style
  const activeRadius = styleRadius || radius
  const activeShadow = styleShadow || shadow

  const baseStyles: Record<string, React.CSSProperties> = {
    color: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      background: `hsl(${hsl.h}, 100%, 50%)`,
      borderRadius: activeRadius,
      ...colorStyle,
    },
    white: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      borderRadius: activeRadius,
      ...white,
    },
    black: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      boxShadow: activeShadow,
      borderRadius: activeRadius,
      ...black,
    },
    pointer: {
      position: 'absolute',
      top: `${-(hsv.v * 100) + 100}%`,
      left: `${hsv.s * 100}%`,
      cursor: 'default',
      ...pointer,
    },
    circle: {
      width: '4px',
      height: '4px',
      boxShadow: `0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),
        0 0 1px 2px rgba(0,0,0,.4)`,
      borderRadius: '50%',
      cursor: 'hand',
      transform: 'translate(-2px, -2px)',
      ...circle,
    },
  }

  return (
    <div
      style={baseStyles.color}
      ref={container}
      onMouseDown={handleMouseDown}
      onTouchMove={handleTouchStart}
      onTouchStart={handleTouchStart}
    >
      <style>{`
        .saturation-white {
          background: -webkit-linear-gradient(to right, #fff, rgba(255,255,255,0));
          background: linear-gradient(to right, #fff, rgba(255,255,255,0));
        }
        .saturation-black {
          background: -webkit-linear-gradient(to top, #000, rgba(0,0,0,0));
          background: linear-gradient(to top, #000, rgba(0,0,0,0));
        }
      `}</style>
      <div style={baseStyles.white} className="saturation-white">
        <div style={baseStyles.black} className="saturation-black" />
        <div style={baseStyles.pointer}>
          {Pointer ? (
            <Pointer hsv={hsv} hsl={hsl} radius={activeRadius} shadow={activeShadow} />
          ) : (
            <div style={baseStyles.circle} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Saturation
