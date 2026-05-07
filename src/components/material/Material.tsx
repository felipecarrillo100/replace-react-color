import React, { FC } from 'react'
import reactCSS from '../../reactcss'
import { merge } from '../../helpers/utils'
import * as color from '../../helpers/color'
import { ColorWrap, EditableInput, Raised } from '../common'
import { RGB } from '../../types'

export interface MaterialProps {
  onChange?: (color: any, e: any) => void;
  hex: string;
  rgb: RGB;
  styles?: any;
  className?: string;
}

export const Material: FC<MaterialProps> = ({
  onChange,
  hex,
  rgb,
  styles: passedStyles = {},
  className = ''
}) => {
  const styles = reactCSS(merge({
    'default': {
      material: {
        width: '98px',
        height: '98px',
        padding: '16px',
        fontFamily: 'Roboto',
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
    },
  }, passedStyles))

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
      <div style={styles.material as React.CSSProperties} className={`material-picker ${className}`}>
        <EditableInput
          style={{ wrap: styles.HEXwrap as React.CSSProperties, input: styles.HEXinput as React.CSSProperties, label: styles.HEXlabel as React.CSSProperties }}
          label="hex"
          value={hex}
          onChange={handleChange}
        />
        <div style={styles.split as React.CSSProperties} className="flexbox-fix">
          <div style={styles.third as React.CSSProperties}>
            <EditableInput
              style={{ wrap: styles.RGBwrap as React.CSSProperties, input: styles.RGBinput as React.CSSProperties, label: styles.RGBlabel as React.CSSProperties }}
              label="r"
              value={rgb.r}
              onChange={handleChange}
            />
          </div>
          <div style={styles.third as React.CSSProperties}>
            <EditableInput
              style={{ wrap: styles.RGBwrap as React.CSSProperties, input: styles.RGBinput as React.CSSProperties, label: styles.RGBlabel as React.CSSProperties }}
              label="g"
              value={rgb.g}
              onChange={handleChange}
            />
          </div>
          <div style={styles.third as React.CSSProperties}>
            <EditableInput
              style={{ wrap: styles.RGBwrap as React.CSSProperties, input: styles.RGBinput as React.CSSProperties, label: styles.RGBlabel as React.CSSProperties }}
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
