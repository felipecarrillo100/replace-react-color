import React, { FC } from 'react'
import reactCSS from '../../reactcss'
import { merge } from '../../helpers/utils'
import { materialColors as material } from '../../constants/material-colors'
import { ColorWrap } from '../common'
import CircleSwatch from './CircleSwatch'

export interface CircleProps {
  width?: string | number;
  onChange?: (color: any, e: any) => void;
  onSwatchHover?: (color: string, e: React.MouseEvent) => void;
  colors?: string[];
  hex: string;
  circleSize?: number;
  circleSpacing?: number;
  styles?: any;
  className?: string;
}

export const Circle: FC<CircleProps> = ({
  width = 252,
  onChange,
  onSwatchHover,
  colors = [
    material.red['500'], material.pink['500'], material.purple['500'],
    material.deepPurple['500'], material.indigo['500'], material.blue['500'],
    material.lightBlue['500'], material.cyan['500'], material.teal['500'],
    material.green['500'], material.lightGreen['500'], material.lime['500'],
    material.yellow['500'], material.amber['500'], material.orange['500'],
    material.deepOrange['500'], material.brown['500'], material.blueGrey['500']
  ],
  hex,
  circleSize = 28,
  circleSpacing = 14,
  styles: passedStyles = {},
  className = ''
}) => {
  const styles = reactCSS(merge({
    'default': {
      card: {
        width,
        display: 'flex',
        flexWrap: 'wrap',
        marginRight: -circleSpacing,
        marginBottom: -circleSpacing,
      },
    },
  }, passedStyles))

  const handleChange = (hexCode: string, e: any) => onChange && onChange({ hex: hexCode, source: 'hex' }, e)

  return (
    <div style={styles.card as React.CSSProperties} className={`circle-picker ${className}`}>
      {colors.map((c: string) => (
        <CircleSwatch
          key={c}
          color={c}
          onClick={handleChange}
          onSwatchHover={onSwatchHover}
          active={hex === c.toLowerCase()}
          circleSize={circleSize}
          circleSpacing={circleSpacing}
        />
      ))}
    </div>
  )
}

export default ColorWrap(Circle)
