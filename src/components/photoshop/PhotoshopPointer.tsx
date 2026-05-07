import React, { FC } from 'react'
import reactCSS from '../../reactcss'

export const PhotoshopPointer: FC = () => {
  const styles = reactCSS({
    'default': {
      triangle: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '4px 0 4px 6px',
        borderColor: 'transparent transparent transparent #fff',
        position: 'absolute',
        top: '1px',
        left: '1px',
      },
      triangleBorder: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '5px 0 5px 8px',
        borderColor: 'transparent transparent transparent #555',
      },
      left: {
        position: 'absolute',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '5px 0 5px 8px',
        borderColor: 'transparent transparent transparent #555',
        transform: 'translate(-13px, -4px)',
      },
      leftInside: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '4px 0 4px 6px',
        borderColor: 'transparent transparent transparent #fff',
        position: 'absolute',
        top: '1px',
        left: '1px',
        transform: 'translate(-8px, -5px)',
      },
      right: {
        position: 'absolute',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '5px 0 5px 8px',
        borderColor: 'transparent transparent transparent #555',
        transform: 'translate(20px, -14px) rotate(180deg)',
      },
      rightInside: {
        width: 0,
        height: '0px',
        borderStyle: 'solid',
        borderWidth: '4px 0 4px 6px',
        borderColor: 'transparent transparent transparent #fff',
        position: 'absolute',
        top: '1px',
        left: '1px',
        transform: 'translate(-8px, -5px)',
      },
      pointer: {
        position: 'relative',
      },
    },
  })

  return (
    <div style={styles.pointer as React.CSSProperties}>
      <div style={styles.left as React.CSSProperties}>
        <div style={styles.leftInside as React.CSSProperties} />
      </div>

      <div style={styles.right as React.CSSProperties}>
        <div style={styles.rightInside as React.CSSProperties} />
      </div>
    </div>
  )
}

export default PhotoshopPointer
