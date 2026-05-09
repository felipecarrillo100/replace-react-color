import React, { FC } from 'react'
import reactCSS from '../../reactcss'

export const PhotoshopPointer: FC = () => {
  const styles = reactCSS({
    'default': {
      left: {
        position: 'absolute',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '5px 0 5px 8px',
        borderColor: 'transparent transparent transparent #555',
        transform: 'translate(-13px, -5px)',
      },
      leftInside: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '4px 0 4px 6px',
        borderColor: 'transparent transparent transparent #fff',
        position: 'absolute',
        top: '0px',
        left: '0px',
        transform: 'translate(-8px, -5px)',
      },
      right: {
        position: 'absolute',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '5px 8px 5px 0',
        borderColor: 'transparent #555 transparent transparent',
        transform: 'translate(20px, -5px)',
      },
      rightInside: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '4px 6px 4px 0',
        borderColor: 'transparent #fff transparent transparent',
        position: 'absolute',
        top: '0px',
        left: '0px',
        transform: 'translate(1px, -5px)',
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
