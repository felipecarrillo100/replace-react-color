import React, { FC } from 'react'
import reactCSS from '../../reactcss'
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
  const styles = reactCSS({
    'default': {
      color: {
        background: color,
        width: '15px',
        height: '15px',
        float: 'left',
        marginRight: '5px',
        marginBottom: '5px',
        position: 'relative',
        cursor: 'pointer',
      },
      dot: {
        position: 'absolute',
        top: '5px',
        right: '5px',
        bottom: '5px',
        left: '5px',
        background: colorUtils.getContrastingColor(color),
        borderRadius: '50%',
        opacity: '0',
      },
    },
    'active': {
      dot: {
        opacity: '1',
      },
    },
    'color-#FFFFFF': {
      color: {
        boxShadow: 'inset 0 0 0 1px #ddd',
      },
      dot: {
        background: '#000',
      },
    },
    'transparent': {
      dot: {
        background: '#000',
      },
    },
  }, { active, 'color-#FFFFFF': color.toUpperCase() === '#FFFFFF', 'transparent': color === 'transparent' })

  return (
    <Swatch
      style={styles.color as React.CSSProperties}
      color={color}
      onClick={onClick}
      onHover={onSwatchHover}
      focusStyle={{ boxShadow: `0 0 4px ${color}` }}
    >
      <div style={styles.dot as React.CSSProperties} />
    </Swatch>
  )
}

export default CompactColor
