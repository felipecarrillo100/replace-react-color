import React, { FC, useCallback } from 'react'
import { EditableInput } from '../common'
import { RGB } from '../../types'

export interface CompactFieldsProps {
  hex: string;
  rgb: RGB;
  onChange?: (color: any, e: any) => void;
}

export const CompactFields: FC<CompactFieldsProps> = ({ hex, rgb, onChange }) => {
  const baseStyles: Record<string, React.CSSProperties> = {
    fields: {
      display: 'flex',
      paddingBottom: '6px',
      paddingRight: '5px',
      position: 'relative',
    },
    active: {
      position: 'absolute',
      top: '6px',
      left: '5px',
      height: '9px',
      width: '9px',
      background: hex,
    },
    HEXwrap: {
      flex: '6',
      position: 'relative',
    },
    HEXinput: {
      width: '80%',
      padding: '0px',
      paddingLeft: '20%',
      border: 'none',
      outline: 'none',
      background: 'none',
      fontSize: '12px',
      color: '#333',
      height: '16px',
    },
    HEXlabel: {
      display: 'none',
    },
    RGBwrap: {
      flex: '3',
      position: 'relative',
    },
    RGBinput: {
      width: '70%',
      padding: '0px',
      paddingLeft: '30%',
      border: 'none',
      outline: 'none',
      background: 'none',
      fontSize: '12px',
      color: '#333',
      height: '16px',
    },
    RGBlabel: {
      position: 'absolute',
      top: '3px',
      left: '0px',
      lineHeight: '16px',
      textTransform: 'uppercase',
      fontSize: '12px',
      color: '#999',
    },
  }

  const handleChange = useCallback((data: any, e: any) => {
    if (!onChange) return
    if (data.r || data.g || data.b) {
      onChange({
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        source: 'rgb',
      }, e)
    } else {
      onChange({
        hex: data.hex,
        source: 'hex',
      }, e)
    }
  }, [onChange, rgb])

  return (
    <div style={baseStyles.fields} className="flexbox-fix">
      <div style={baseStyles.active} />
      <EditableInput
        style={{ wrap: baseStyles.HEXwrap, input: baseStyles.HEXinput, label: baseStyles.HEXlabel }}
        label="hex"
        value={hex}
        onChange={handleChange}
      />
      <EditableInput
        style={{ wrap: baseStyles.RGBwrap, input: baseStyles.RGBinput, label: baseStyles.RGBlabel }}
        label="r"
        value={rgb.r}
        onChange={handleChange}
      />
      <EditableInput
        style={{ wrap: baseStyles.RGBwrap, input: baseStyles.RGBinput, label: baseStyles.RGBlabel }}
        label="g"
        value={rgb.g}
        onChange={handleChange}
      />
      <EditableInput
        style={{ wrap: baseStyles.RGBwrap, input: baseStyles.RGBinput, label: baseStyles.RGBlabel }}
        label="b"
        value={rgb.b}
        onChange={handleChange}
      />
    </div>
  )
}

export default CompactFields
