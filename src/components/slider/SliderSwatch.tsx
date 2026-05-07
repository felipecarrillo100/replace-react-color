import React, { FC } from 'react'
import reactCSS from '../../reactcss'
import { HSL } from '../../types'

export interface SliderSwatchProps {
  hsl: HSL;
  offset: number;
  onClick?: (color: any, e: any) => void;
  active?: boolean;
  first?: boolean;
  last?: boolean;
}

export const SliderSwatch: FC<SliderSwatchProps> = ({ hsl, offset, onClick = () => {}, active, first, last }) => {
  const styles = reactCSS({
    'default': {
      swatch: {
        height: '12px',
        background: `hsl(${hsl.h}, 50%, ${(offset * 100)}%)`,
        cursor: 'pointer',
      },
    },
    'first': {
      swatch: {
        borderRadius: '2px 0 0 2px',
      },
    },
    'last': {
      swatch: {
        borderRadius: '0 2px 2px 0',
      },
    },
    'active': {
      swatch: {
        transform: 'scaleY(1.8)',
        borderRadius: '3.6px/2px',
      },
    },
  }, { active, first, last })

  const handleClick = (e: React.MouseEvent) => onClick({
    h: hsl.h,
    s: 0.5,
    l: offset,
    source: 'hsl',
  }, e)

  return (
    <div style={styles.swatch as React.CSSProperties} onClick={handleClick} />
  )
}

export default SliderSwatch
