import React, { FC } from 'react'
import SwatchesColor from './SwatchesColor'

export interface SwatchesGroupProps {
  onClick?: (color: string, e: any) => void;
  onSwatchHover?: (color: string, e: React.MouseEvent) => void;
  group: string[];
  active: string;
}

export const SwatchesGroup: FC<SwatchesGroupProps> = ({ onClick, onSwatchHover, group, active }) => {
  const groupStyle: React.CSSProperties = {
    paddingBottom: '10px',
    width: '40px',
    float: 'left',
    marginRight: '10px',
  }

  return (
    <div style={groupStyle}>
      {group.map((color: string, i) => (
        <SwatchesColor
          key={color}
          color={color}
          active={color.toLowerCase() === active}
          first={i === 0}
          last={i === group.length - 1}
          onClick={onClick}
          onSwatchHover={onSwatchHover}
        />
      ))}
    </div>
  )
}

export default SwatchesGroup
