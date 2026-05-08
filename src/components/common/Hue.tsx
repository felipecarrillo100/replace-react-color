import React, { FC, useRef, useEffect, useCallback } from 'react'
import reactCSS from '../../reactcss'
import * as hue from '../../helpers/hue'
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

  const handleChange = useCallback((e: any) => {
    if (container.current) {
      const change = hue.calculateChange(e, direction, hsl, container.current)
      change && typeof onChange === 'function' && onChange(change, e)
    }
  }, [direction, hsl, onChange])

  const handleMouseUp = useCallback(() => {
    window.removeEventListener('mousemove', handleChange)
    window.removeEventListener('mouseup', handleMouseUp)
  }, [handleChange])

  const handleMouseDown = (e: React.MouseEvent) => {
    handleChange(e)
    window.addEventListener('mousemove', handleChange)
    window.addEventListener('mouseup', handleMouseUp)
  }

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleChange)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleChange, handleMouseUp])

  const styles = reactCSS({
    'default': {
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
        left: `${(hsl.h * 100) / 360}%`,
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
    },
    'vertical': {
      pointer: {
        left: '0px',
        top: `${-((hsl.h * 100) / 360) + 100}%`,
      },
    },
  }, { vertical: direction === 'vertical' })

  return (
    <div style={styles.hue as React.CSSProperties}>
      <div
        className={`hue-${direction}`}
        style={styles.container as React.CSSProperties}
        ref={container}
        onMouseDown={handleMouseDown}
        onTouchMove={handleChange}
        onTouchStart={handleChange}
      >
        <style>{`
          .hue-horizontal {
            background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
            background: -webkit-linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #00f 83%, #f00 100%);
          }

          .hue-vertical {
            background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
            background: -webkit-linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
          }
        `}</style>
        <div style={styles.pointer as React.CSSProperties}>
          {Pointer ? (
            <Pointer hsl={hsl} direction={direction} radius={activeRadius} shadow={activeShadow} />
          ) : (
            <div style={styles.slider as React.CSSProperties} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Hue
