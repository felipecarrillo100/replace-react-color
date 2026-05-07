import React, { FC } from 'react'
import reactCSS from '../../reactcss'
import { Swatch } from '../common'

export interface BlockSwatchesProps {
  colors: string[];
  onClick?: (color: string, e: React.MouseEvent | React.KeyboardEvent) => void;
  onSwatchHover?: (color: string, e: React.MouseEvent) => void;
}

export const BlockSwatches: FC<BlockSwatchesProps> = ({ colors, onClick, onSwatchHover }) => {
  const styles = reactCSS({
    'default': {
      swatches: {
        marginRight: '-10px',
      },
      swatch: {
        width: '22px',
        height: '22px',
        float: 'left',
        marginRight: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
      },
      clear: {
        clear: 'both',
      },
    },
  })

  return (
    <div style={styles.swatches as React.CSSProperties}>
      {colors.map((c: string) => (
        <Swatch
          key={c}
          color={c}
          style={styles.swatch as React.CSSProperties}
          onClick={onClick}
          onHover={onSwatchHover}
          focusStyle={{
            boxShadow: `0 0 4px ${c}`,
          }}
        />
      ))}
      <div style={styles.clear as React.CSSProperties} />
    </div>
  )
}

export default BlockSwatches
