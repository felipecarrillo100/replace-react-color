import React, { FC } from 'react'

export interface HuePointerProps {
  direction?: 'horizontal' | 'vertical';
}

export const HuePointer: FC<HuePointerProps> = ({ direction }) => {
  const pickerStyle: React.CSSProperties = {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    transform: direction === 'vertical' ? 'translate(-3px, -9px)' : 'translate(-9px, -1px)',
    backgroundColor: 'rgb(248, 248, 248)',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
  }

  return (
    <div style={pickerStyle} />
  )
}

export default HuePointer
