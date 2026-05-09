import React, { FC } from 'react'
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
  const swatchStyle: React.CSSProperties = {
    height: '12px',
    background: `hsl(${hsl.h}, 50%, ${(offset * 100)}%)`,
    cursor: 'pointer',
    ...(first ? { borderRadius: '2px 0 0 2px' } : {}),
    ...(last ? { borderRadius: '0 2px 2px 0' } : {}),
    ...(active ? { transform: 'scaleY(1.8)', borderRadius: '3.6px/2px' } : {}),
  }

  const handleClick = (e: React.MouseEvent) => onClick({
    h: hsl.h,
    s: 0.5,
    l: offset,
    source: 'hsl',
  }, e)

  return (
    <div style={swatchStyle} onClick={handleClick} />
  )
}

export default SliderSwatch
