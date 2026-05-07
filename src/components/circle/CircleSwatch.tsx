import React, { FC, useState } from 'react'
import reactCSS from '../../reactcss'
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

  const styles = reactCSS({
    'default': {
      swatch: {
        width: circleSize,
        height: circleSize,
        marginRight: circleSpacing,
        marginBottom: circleSpacing,
        transform: 'scale(1)',
        transition: '100ms transform ease',
      },
      Swatch: {
        borderRadius: '50%',
        background: 'transparent',
        boxShadow: `inset 0 0 0 ${(circleSize / 2) + 1}px ${color}`,
        transition: '100ms box-shadow ease',
      },
    },
    'hover': {
      swatch: {
        transform: 'scale(1.2)',
      },
    },
    'active': {
      Swatch: {
        boxShadow: `inset 0 0 0 3px ${color}`,
      },
    },
  }, { hover, active })

  return (
    <div
      style={styles.swatch as React.CSSProperties}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Swatch
        style={styles.Swatch as React.CSSProperties}
        color={color}
        onClick={onClick}
        onHover={onSwatchHover}
        focusStyle={{ boxShadow: `${(styles.Swatch as any).boxShadow}, 0 0 5px ${color}` }}
      />
    </div>
  )
}

export default CircleSwatch
