import React, { FC } from 'react'
import { Swatch } from '../common'

export interface BlockSwatchesProps {
  colors: string[];
  onClick?: (color: string, e: React.MouseEvent | React.KeyboardEvent) => void;
  onSwatchHover?: (color: string, e: React.MouseEvent) => void;
}

export const BlockSwatches: FC<BlockSwatchesProps> = ({ colors, onClick, onSwatchHover }) => {
  const baseStyles: Record<string, React.CSSProperties> = {
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
  }

  return (
    <div style={baseStyles.swatches}>
      {colors.map((c: string) => (
        <Swatch
          key={c}
          color={c}
          style={baseStyles.swatch}
          onClick={onClick}
          onHover={onSwatchHover}
          focusStyle={{
            boxShadow: `0 0 4px ${c}`,
          }}
        />
      ))}
      <div style={baseStyles.clear} />
    </div>
  )
}

export default BlockSwatches
