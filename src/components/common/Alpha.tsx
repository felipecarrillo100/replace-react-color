import React, { useRef, useEffect, FC } from 'react'
import reactCSS from '../../reactcss'
import * as alpha from '../../helpers/alpha'
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

  const handleChange = (e: any) => {
    if (container.current) {
      const change = alpha.calculateChange(e, hsl, direction, a ?? rgb.a ?? 1, container.current)
      change && typeof onChange === 'function' && onChange(change, e)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    handleChange(e)
    window.addEventListener('mousemove', handleChange)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleChange)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleChange)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const styles = reactCSS({
    'default': {
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
        background: `linear-gradient(to right, rgba(${rgb.r},${rgb.g},${rgb.b}, 0) 0%, rgba(${rgb.r},${rgb.g},${rgb.b}, 1) 100%)`,
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
        left: `${(rgb.a ?? 1) * 100}%`,
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
    },
    'vertical': {
      gradient: {
        background: `linear-gradient(to bottom, rgba(${rgb.r},${rgb.g},${rgb.b}, 0) 0%, rgba(${rgb.r},${rgb.g},${rgb.b}, 1) 100%)`,
      },
      pointer: {
        left: 0,
        top: `${(rgb.a ?? 1) * 100}%`,
      },
    },
    'overwrite': {
      ...style,
    },
  }, {
    vertical: direction === 'vertical',
    overwrite: true,
  })

  return (
    <div style={styles.alpha}>
      <div style={styles.checkboard}>
        <Checkboard renderers={renderers} />
      </div>
      <div style={styles.gradient} />
      <div
        style={styles.container as React.CSSProperties}
        ref={container}
        onMouseDown={handleMouseDown}
        onTouchMove={handleChange}
        onTouchStart={handleChange}
      >
        <div style={styles.pointer as React.CSSProperties}>
          {Pointer ? (
            <Pointer rgb={rgb} hsl={hsl} direction={direction} radius={activeRadius} shadow={activeShadow} a={a} />
          ) : (
            <div style={styles.slider as React.CSSProperties} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Alpha
