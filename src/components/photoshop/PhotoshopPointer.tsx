import React, { FC } from 'react'

export const PhotoshopPointer: FC = () => {
  const baseStyles: Record<string, React.CSSProperties> = {
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
  }

  return (
    <div style={baseStyles.pointer}>
      <div style={baseStyles.left}>
        <div style={baseStyles.leftInside} />
      </div>

      <div style={baseStyles.right}>
        <div style={baseStyles.rightInside} />
      </div>
    </div>
  )
}

export default PhotoshopPointer
