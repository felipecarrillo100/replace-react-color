import React, { FC } from 'react'
import * as colorUtils from '../../helpers/color'
import { Swatch, CheckIcon } from '../common'

export interface SwatchesColorProps {
  color: string;
  onClick?: (color: string, e: any) => void;
  onSwatchHover?: (color: string, e: React.MouseEvent) => void;
  first?: boolean;
  last?: boolean;
  active?: boolean;
}

export const SwatchesColor: FC<SwatchesColorProps> = ({
  color,
  onClick = () => {},
  onSwatchHover,
  first,
  last,
  active
}) => {
  const baseStyles: Record<string, React.CSSProperties> = {
    color: {
      width: '40px',
      height: '24px',
      cursor: 'pointer',
      background: color,
      marginBottom: '1px',
      ...(first ? { overflow: 'hidden', borderRadius: '2px 2px 0 0' } : {}),
      ...(last ? { overflow: 'hidden', borderRadius: '0 0 2px 2px' } : {}),
      ...(color.toUpperCase() === '#FFFFFF' ? { boxShadow: 'inset 0 0 0 1px #ddd' } : {}),
    },
    check: {
      color: (color.toUpperCase() === '#FFFFFF' || color === 'transparent')
        ? '#333'
        : colorUtils.getContrastingColor(color),
      marginLeft: '8px',
      display: active ? 'block' : 'none',
    },
  }

  return (
    <Swatch
      color={color}
      style={baseStyles.color}
      onClick={onClick}
      onHover={onSwatchHover}
      focusStyle={{ boxShadow: `0 0 4px ${color}` }}
    >
      <div style={baseStyles.check}>
        <CheckIcon />
      </div>
    </Swatch>
  )
}

export default SwatchesColor
