import React, { FC } from 'react'
import { HSL } from '../../types'

export interface PhotoshopPointerCircleProps {
  hsl: HSL;
}

export const PhotoshopPointerCircle: FC<PhotoshopPointerCircleProps> = ({ hsl }) => {
  const pickerStyle: React.CSSProperties = {
    width: '12px',
    height: '12px',
    borderRadius: '6px',
    boxShadow: hsl.l > 0.5 ? 'inset 0 0 0 1px #000' : 'inset 0 0 0 1px #fff',
    transform: 'translate(-6px, -6px)',
  }

  return (
    <div style={pickerStyle} />
  )
}

export default PhotoshopPointerCircle
