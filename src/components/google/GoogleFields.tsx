import React, { FC, useCallback } from 'react'
import * as color from '../../helpers/color'
import { EditableInput } from '../common'
import { HSL, HSV, RGB } from '../../types'

export interface GoogleFieldsProps {
  onChange?: (color: any, e: any) => void;
  rgb: RGB;
  hsl: HSL;
  hex: string;
  hsv: HSV;
}

export const GoogleFields: FC<GoogleFieldsProps> = ({ onChange, rgb, hsl, hex, hsv }) => {
  const handleChange = useCallback((data: any, e: any) => {
    if (!onChange) return
    if (data.hex) {
      color.isValidHex(data.hex) && onChange({
        hex: data.hex,
        source: 'hex',
      }, e)
    } else if (data.rgb) {
      const values = data.rgb.split(',')
      color.isvalidColorString(data.rgb, 'rgb') && onChange({
        r: values[0].trim(),
        g: values[1].trim(),
        b: values[2].trim(),
        a: 1,
        source: 'rgb',
      }, e)
    } else if (data.hsv) {
      const values = data.hsv.split(',')
      if (color.isvalidColorString(data.hsv, 'hsv')) {
        let h = values[0].replace('°', '').trim()
        let s = values[1].replace('%', '').trim()
        let v = values[2].replace('%', '').trim()

        if (s == '1') {
          s = '0.01'
        } else if (v == '1') {
          v = '0.01'
        }
        onChange({
          h: Number(h),
          s: Number(s),
          v: Number(v),
          source: 'hsv',
        }, e)
      }
    } else if (data.hsl) {
      const values = data.hsl.split(',')
      if (color.isvalidColorString(data.hsl, 'hsl')) {
        let h = values[0].replace('°', '').trim()
        let s = values[1].replace('%', '').trim()
        let l = values[2].replace('%', '').trim()

        if (s == '1') {
          s = '0.01'
        } else if (l == '1') {
          l = '0.01'
        }
        onChange({
          h: Number(h),
          s: Number(s),
          l: Number(l),
          source: 'hsl',
        }, e)
      }
    }
  }, [onChange])

  const baseStyles: Record<string, React.CSSProperties> = {
    wrap: {
      display: 'flex',
      height: '100px',
      marginTop: '4px',
    },
    fields: {
      width: '100%',
    },
    column: {
      paddingTop: '10px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    double: {
      padding: '0px 4.4px',
      boxSizing: 'border-box',
    },
    input: {
      width: '100%',
      height: '38px',
      boxSizing: 'border-box',
      padding: '4px 10% 3px',
      textAlign: 'center',
      border: '1px solid #dadce0',
      fontSize: '11px',
      textTransform: 'lowercase',
      borderRadius: '5px',
      outline: 'none',
      fontFamily: 'Roboto,Arial,sans-serif',
    },
    input2: {
      height: '38px',
      width: '100%',
      border: '1px solid #dadce0',
      boxSizing: 'border-box',
      fontSize: '11px',
      textTransform: 'lowercase',
      borderRadius: '5px',
      outline: 'none',
      paddingLeft: '10px',
      fontFamily: 'Roboto,Arial,sans-serif',
    },
    label: {
      textAlign: 'center',
      fontSize: '12px',
      background: '#fff',
      position: 'absolute',
      textTransform: 'uppercase',
      color: '#3c4043',
      width: '35px',
      top: '-6px',
      left: '0',
      right: '0',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontFamily: 'Roboto,Arial,sans-serif',
    },
    label2: {
      left: '10px',
      textAlign: 'center',
      fontSize: '12px',
      background: '#fff',
      position: 'absolute',
      textTransform: 'uppercase',
      color: '#3c4043',
      width: '32px',
      top: '-6px',
      fontFamily: 'Roboto,Arial,sans-serif',
    },
    single: {
      flexGrow: '1',
      margin: '0px 4.4px',
    },
  }

  const rgbValue = `${rgb.r}, ${rgb.g}, ${rgb.b}`
  const hslValue = `${Math.round(hsl.h)}°, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%`
  const hsvValue = `${Math.round(hsv.h)}°, ${Math.round(hsv.s * 100)}%, ${Math.round(hsv.v * 100)}%`

  return (
    <div style={baseStyles.wrap} className="flexbox-fix">
      <div style={baseStyles.fields}>
        <div style={baseStyles.double}>
          <EditableInput
            style={{ input: baseStyles.input, label: baseStyles.label }}
            label="hex"
            value={hex}
            onChange={handleChange}
          />
        </div>
        <div style={baseStyles.column}>
          <div style={baseStyles.single}>
            <EditableInput
              style={{ input: baseStyles.input2, label: baseStyles.label2 }}
              label="rgb"
              value={rgbValue}
              onChange={handleChange}
            />
          </div>
          <div style={baseStyles.single}>
            <EditableInput
              style={{ input: baseStyles.input2, label: baseStyles.label2 }}
              label="hsv"
              value={hsvValue}
              onChange={handleChange}
            />
          </div>
          <div style={baseStyles.single}>
            <EditableInput
              style={{ input: baseStyles.input2, label: baseStyles.label2 }}
              label="hsl"
              value={hslValue}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoogleFields
