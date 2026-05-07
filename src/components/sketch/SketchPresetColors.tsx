import React, { FC } from 'react'
import reactCSS from '../../reactcss'
import { Swatch } from '../common'

export interface SketchPresetColor {
  color: string;
  title?: string;
}

export interface SketchPresetColorsProps {
  colors: (string | SketchPresetColor)[];
  onClick?: (color: any, e: React.MouseEvent | React.KeyboardEvent) => void;
  onSwatchHover?: (color: any, e: React.MouseEvent) => void;
}

export const SketchPresetColors: FC<SketchPresetColorsProps> = ({
  colors,
  onClick = () => {},
  onSwatchHover
}) => {
  const styles = reactCSS({
    'default': {
      colors: {
        margin: '0 -10px',
        padding: '10px 0 0 10px',
        borderTop: '1px solid #eee',
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative',
      },
      swatchWrap: {
        width: '16px',
        height: '16px',
        margin: '0 10px 10px 0',
      },
      swatch: {
        borderRadius: '3px',
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15)',
      },
    },
    'no-presets': {
      colors: {
        display: 'none',
      },
    },
  }, {
    'no-presets': !colors || !colors.length,
  })

  const handleClick = (hex: string, e: React.MouseEvent | React.KeyboardEvent) => {
    onClick({
      hex,
      source: 'hex',
    }, e)
  }

  return (
    <div style={styles.colors as React.CSSProperties} className="flexbox-fix">
      {colors.map((colorObjOrString) => {
        const c = typeof colorObjOrString === 'string'
          ? { color: colorObjOrString }
          : colorObjOrString
        const key = `${c.color}${c.title || ''}`
        return (
          <div key={key} style={styles.swatchWrap as React.CSSProperties}>
            <Swatch
              {...c}
              style={styles.swatch}
              onClick={handleClick}
              onHover={onSwatchHover}
              focusStyle={{
                boxShadow: `inset 0 0 0 1px rgba(0,0,0,.15), 0 0 4px ${c.color}`,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default SketchPresetColors
