import React, { FC } from 'react'
import * as colorUtils from '../../helpers/color'
import { Swatch } from '../common'

export interface CompactColorProps {
  color: string;
  onClick?: (color: string, e: any) => void;
  onSwatchHover?: (color: string, e: React.MouseEvent) => void;
  active?: boolean;
}

export const CompactColor: FC<CompactColorProps> = ({
  color,
  onClick = () => {},
  onSwatchHover,
  active
}) => {
  const isWhite = color.toUpperCase() === '#FFFFFF'
  const isTransparent = color === 'transparent'

  const baseStyles: Record<string, React.CSSProperties> = {
    color: {
      background: color,
      width: '15px',
      height: '15px',
      float: 'left',
      marginRight: '5px',
      marginBottom: '5px',
      position: 'relative',
      cursor: 'pointer',
      ...(isWhite ? { boxShadow: 'inset 0 0 0 1px #ddd' } : {}),
    },
    dot: {
      position: 'absolute',
      top: '5px',
      right: '5px',
      bottom: '5px',
      left: '5px',
      background: (isWhite || isTransparent) ? '#000' : colorUtils.getContrastingColor(color),
      borderRadius: '50%',
      opacity: active ? '1' : '0',
    },
  }

  return (
    <Swatch
      style={baseStyles.color}
      color={color}
      onClick={onClick}
      onHover={onSwatchHover}
      focusStyle={{ boxShadow: `0 0 4px ${color}` }}
    >
      <div style={baseStyles.dot} />
    </Swatch>
  )
}

export default CompactColor
