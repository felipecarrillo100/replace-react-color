import React, { FC, useState } from 'react'
import { Swatch } from '../common'

export interface CircleSwatchProps {
  color: string;
  onClick?: (color: string, e: any) => void;
  onSwatchHover?: (color: string, e: React.MouseEvent) => void;
  active?: boolean;
  circleSize?: number;
  circleSpacing?: number;
}

export const CircleSwatch: FC<CircleSwatchProps> = ({
  color,
  onClick,
  onSwatchHover,
  active,
  circleSize = 28,
  circleSpacing = 14
}) => {
  const [hover, setHover] = useState(false)

  const baseStyles: Record<string, React.CSSProperties> = {
    swatch: {
      width: circleSize,
      height: circleSize,
      marginRight: circleSpacing,
      marginBottom: circleSpacing,
      transform: hover ? 'scale(1.2)' : 'scale(1)',
      transition: '100ms transform ease',
    },
    Swatch: {
      borderRadius: '50%',
      background: 'transparent',
      boxShadow: active 
        ? `inset 0 0 0 3px ${color}`
        : `inset 0 0 0 ${(circleSize / 2) + 1}px ${color}`,
      transition: '100ms box-shadow ease',
    },
  }

  return (
    <div
      style={baseStyles.swatch}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Swatch
        style={baseStyles.Swatch}
        color={color}
        onClick={onClick}
        onHover={onSwatchHover}
        focusStyle={{ boxShadow: `${baseStyles.Swatch.boxShadow}, 0 0 5px ${color}` }}
      />
    </div>
  )
}

export default CircleSwatch
