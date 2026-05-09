import React, { FC, useRef } from 'react'
import * as hue from '../../helpers/hue'
import { useColorDrag } from '../../helpers/useColorDrag'
import { HSL } from '../../types'

export interface HueProps {
  hsl: HSL;
  direction?: 'horizontal' | 'vertical';
  radius?: string | number;
  shadow?: string;
  onChange?: (color: any, e: any) => void;
  pointer?: FC<any>;
  style?: {
    radius?: string | number;
    shadow?: string;
  };
}

export const Hue: FC<HueProps> = ({
  hsl,
  direction = 'horizontal',
  radius,
  shadow,
  onChange,
  pointer: Pointer,
  style = {}
}) => {
  const { radius: styleRadius, shadow: styleShadow } = style;
  const activeRadius = styleRadius || radius;
  const activeShadow = styleShadow || shadow;
  const container = useRef<HTMLDivElement>(null)

  // Use refs to ensure the drag callback always has access to the latest props
  // without needing to re-create the stable useColorDrag handlers.
  const hslRef = useRef(hsl)
  const onChangeRef = useRef(onChange)
  hslRef.current = hsl
  onChangeRef.current = onChange

  const { handleMouseDown, handleTouchStart } = useColorDrag(container, ({ e, container }) => {
    const change = hue.calculateChange(e, direction, hslRef.current, container)
    change && typeof onChangeRef.current === 'function' && onChangeRef.current(change, e)
  })

  const baseStyles: Record<string, React.CSSProperties> = {
    hue: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      borderRadius: activeRadius,
      boxShadow: activeShadow,
    },
    container: {
      padding: '0 2px',
      position: 'relative',
      height: '100%',
      borderRadius: activeRadius,
    },
    pointer: {
      position: 'absolute',
      ...(direction === 'vertical' ? {
        left: '0px',
        top: `${-((hsl.h * 100) / 360) + 100}%`,
      } : {
        left: `${(hsl.h * 100) / 360}%`,
      })
    },
    slider: {
      marginTop: '1px',
      width: '4px',
      borderRadius: '1px',
      height: '8px',
      boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
      background: '#fff',
      transform: 'translateX(-2px)',
    },
  }

  return (
    <div style={baseStyles.hue}>
      <div
        className={`hue-${direction}`}
        style={baseStyles.container}
        ref={container}
        onMouseDown={handleMouseDown}
        onTouchMove={handleTouchStart}
        onTouchStart={handleTouchStart}
      >
        <style>{`
          .hue-horizontal {
            background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
            background: -webkit-linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
          }

          .hue-vertical {
            background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
            background: -webkit-linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
          }
        `}</style>
        <div style={baseStyles.pointer}>
          {Pointer ? (
            <Pointer hsl={hsl} direction={direction} radius={activeRadius} shadow={activeShadow} />
          ) : (
            <div style={baseStyles.slider} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Hue
