import React, { FC } from 'react'
import reactCSS from '../../reactcss'
import { merge } from '../../helpers/utils'
import * as colorHelper from '../../helpers/color'
import { ColorWrap, EditableInput, Checkboard } from '../common'
import BlockSwatches from './BlockSwatches'

export interface BlockProps {
  onChange?: (color: any, e: any) => void;
  onSwatchHover?: (color: string, e: React.MouseEvent) => void;
  hex: string;
  colors?: string[];
  width?: string | number;
  triangle?: 'top' | 'hide';
  styles?: any;
  className?: string;
}

export const Block: FC<BlockProps> = ({
  onChange,
  onSwatchHover,
  hex,
  colors = ['#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555',
    '#dce775', '#ff8a65', '#ba68c8'],
  width = 170,
  triangle = 'top',
  styles: passedStyles = {},
  className = ''
}) => {
  const transparent = hex === 'transparent'
  const handleChange = (hexCode: string, e: any) => {
    colorHelper.isValidHex(hexCode) && onChange && onChange({
      hex: hexCode,
      source: 'hex',
    }, e)
  }

  const styles = reactCSS(merge({
    'default': {
      card: {
        width,
        background: '#fff',
        boxShadow: '0 1px rgba(0,0,0,.1)',
        borderRadius: '6px',
        position: 'relative',
      },
      head: {
        height: '110px',
        background: hex,
        borderRadius: '6px 6px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      },
      body: {
        padding: '10px',
      },
      label: {
        fontSize: '18px',
        color: colorHelper.getContrastingColor(hex),
        position: 'relative',
      },
      triangle: {
        width: '0px',
        height: '0px',
        borderStyle: 'solid',
        borderWidth: '0 10px 10px 10px',
        borderColor: `transparent transparent ${hex} transparent`,
        position: 'absolute',
        top: '-10px',
        left: '50%',
        marginLeft: '-10px',
      },
      input: {
        width: '100%',
        fontSize: '12px',
        color: '#666',
        border: '0px',
        outline: 'none',
        height: '22px',
        boxShadow: 'inset 0 0 0 1px #ddd',
        borderRadius: '4px',
        padding: '0 7px',
        boxSizing: 'border-box',
      },
    },
    'hide-triangle': {
      triangle: {
        display: 'none',
      },
    },
  }, passedStyles), { 'hide-triangle': triangle === 'hide' })

  return (
    <div style={styles.card as React.CSSProperties} className={`block-picker ${className}`}>
      <div style={styles.triangle as React.CSSProperties} />

      <div style={styles.head as React.CSSProperties}>
        {transparent && (
          <Checkboard borderRadius="6px 6px 0 0" />
        )}
        <div style={styles.label as React.CSSProperties}>
          {hex}
        </div>
      </div>

      <div style={styles.body as React.CSSProperties}>
        <BlockSwatches colors={colors} onClick={handleChange} onSwatchHover={onSwatchHover} />
        <EditableInput
          style={{ input: styles.input as React.CSSProperties }}
          value={hex}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default ColorWrap(Block)
