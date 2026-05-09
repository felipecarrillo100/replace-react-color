import React, { FC } from 'react'
import { mergeStyles } from '../../helpers/styles'
import * as color from '../../helpers/color'
import { ColorWrap, EditableInput, Raised } from '../common'
import { RGB } from '../../types'

export interface MaterialProps {
  onChange?: (color: any, e: any) => void;
  hex: string;
  rgb: RGB;
  styles?: any;
  className?: string;
  style?: React.CSSProperties;
}

export const Material: FC<MaterialProps> = ({
  onChange,
  hex,
  rgb,
  styles: passedStyles = {},
  className = '',
  style = {}
}) => {
  const baseStyles: Record<string, React.CSSProperties> = {
    material: {
      width: '98px',
      height: '98px',
      padding: '16px',
      fontFamily: 'Roboto',
      boxSizing: 'content-box',
      ...style,
    },
    HEXwrap: {
      position: 'relative',
    },
    HEXinput: {
      width: '100%',
      marginTop: '12px',
      fontSize: '15px',
      color: '#333',
      padding: '0px',
      border: '0px',
      borderBottom: `2px solid ${hex}`,
      outline: 'none',
      height: '30px',
    },
    HEXlabel: {
      position: 'absolute',
      top: '0px',
      left: '0px',
      fontSize: '11px',
      color: '#999999',
      textTransform: 'capitalize',
    },
    RGBwrap: {
      position: 'relative',
    },
    RGBinput: {
      width: '100%',
      marginTop: '12px',
      fontSize: '15px',
      color: '#333',
      padding: '0px',
      border: '0px',
      borderBottom: '1px solid #eee',
      outline: 'none',
      height: '30px',
    },
    RGBlabel: {
      position: 'absolute',
      top: '0px',
      left: '0px',
      fontSize: '11px',
      color: '#999999',
      textTransform: 'capitalize',
    },
    split: {
      display: 'flex',
      marginRight: '-10px',
      paddingTop: '11px',
    },
    third: {
      flex: '1',
      paddingRight: '10px',
    },
  }

  const styles = mergeStyles(baseStyles, passedStyles)

  const handleChange = (data: any, e: any) => {
    if (!onChange) return
    if (data.hex) {
      color.isValidHex(data.hex) && onChange({
        hex: data.hex,
        source: 'hex',
      }, e)
    } else if (data.r || data.g || data.b) {
      onChange({
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        source: 'rgb',
      }, e)
    }
  }

  return (
    <Raised styles={passedStyles}>
      <div style={styles.material} className={`material-picker ${className}`}>
        <EditableInput
          style={{ wrap: styles.HEXwrap, input: styles.HEXinput, label: styles.HEXlabel }}
          label="hex"
          value={hex}
          onChange={handleChange}
        />
        <div style={styles.split} className="flexbox-fix">
          <div style={styles.third}>
            <EditableInput
              style={{ wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel }}
              label="r"
              value={rgb.r}
              onChange={handleChange}
            />
          </div>
          <div style={styles.third}>
            <EditableInput
              style={{ wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel }}
              label="g"
              value={rgb.g}
              onChange={handleChange}
            />
          </div>
          <div style={styles.third}>
            <EditableInput
              style={{ wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel }}
              label="b"
              value={rgb.b}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </Raised>
  )
}

export default ColorWrap(Material)
