import React, { FC } from 'react'
import reactCSS from '../../reactcss'
import { HSL } from '../../types'

export interface PhotoshopPointerCircleProps {
  hsl: HSL;
}

export const PhotoshopPointerCircle: FC<PhotoshopPointerCircleProps> = ({ hsl }) => {
  const styles = reactCSS({
    'default': {
      picker: {
        width: '12px',
        height: '12px',
        borderRadius: '6px',
        boxShadow: 'inset 0 0 0 1px #fff',
        transform: 'translate(-6px, -6px)',
      },
    },
    'black-outline': {
      picker: {
        boxShadow: 'inset 0 0 0 1px #000',
      },
    },
  }, { 'black-outline': hsl.l > 0.5 })

  return (
    <div style={styles.picker as React.CSSProperties} />
  )
}

export default PhotoshopPointerCircle
