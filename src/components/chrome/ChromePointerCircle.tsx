import React, { FC } from 'react'

export const ChromePointerCircle: FC = () => {
  const pickerStyle: React.CSSProperties = {
    width: '12px',
    height: '12px',
    borderRadius: '6px',
    boxShadow: 'inset 0 0 0 1px #fff',
    transform: 'translate(-6px, -6px)',
  }

  return (
    <div style={pickerStyle} />
  )
}

export default ChromePointerCircle
