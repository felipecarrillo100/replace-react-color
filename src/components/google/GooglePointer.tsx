import React, { FC } from 'react'
import reactCSS from '../../reactcss'
import { HSL } from '../../types'

export interface GooglePointerProps {
  hsl: HSL;
}

export const GooglePointer: FC<GooglePointerProps> = ({
  hsl = { a: 1, h: 249.94, l: 0.2, s: 0.50 }
}) => {
  const styles = reactCSS({
    'default': {
      picker: {
        width: '20px',
        height: '20px',
        borderRadius: '22px',
        transform: 'translate(-10px, -7px)',
        background: `hsl(${Math.round(hsl.h)}, 100%, 50%)`,
        border: '2px white solid',
      },
    },
  })

  return (
    <div style={styles.picker as React.CSSProperties} />
  )
}

export default GooglePointer
