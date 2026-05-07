import React, { FC, useCallback } from 'react'
import reactCSS from '../../reactcss'
import * as color from '../../helpers/color'
import { EditableInput } from '../common'
import { HSL, RGB } from '../../types'

export interface SketchFieldsProps {
  onChange?: (color: any, e: any) => void;
  rgb: RGB;
  hsl: HSL;
  hex: string;
  disableAlpha?: boolean;
}

export const SketchFields: FC<SketchFieldsProps> = ({
  onChange,
  rgb,
  hsl,
  hex,
  disableAlpha
}) => {
  const styles = reactCSS({
    'default': {
      fields: {
        display: 'flex',
        paddingTop: '4px',
      },
      single: {
        flex: '1',
        paddingLeft: '6px',
      },
      alpha: {
        flex: '1',
        paddingLeft: '6px',
      },
      double: {
        flex: '2',
      },
      input: {
        width: '80%',
        padding: '4px 10% 3px',
        border: 'none',
        boxShadow: 'inset 0 0 0 1px #ccc',
        fontSize: '11px',
      },
      label: {
        display: 'block',
        textAlign: 'center',
        fontSize: '11px',
        color: '#222',
        paddingTop: '3px',
        paddingBottom: '4px',
        textTransform: 'capitalize',
      },
    },
    'disableAlpha': {
      alpha: {
        display: 'none',
      },
    },
  }, { disableAlpha })

  const handleChange = useCallback((data: any, e: any) => {
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
        a: rgb.a,
        source: 'rgb',
      }, e)
    } else if (data.a !== undefined) {
      let a = data.a
      if (a < 0) {
        a = 0
      } else if (a > 100) {
        a = 100
      }

      a /= 100
      onChange({
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a,
        source: 'rgb',
      }, e)
    }
  }, [onChange, rgb, hsl])

  return (
    <div style={styles.fields as React.CSSProperties} className="flexbox-fix">
      <div style={styles.double as React.CSSProperties}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="hex"
          value={hex.replace('#', '')}
          onChange={handleChange}
        />
      </div>
      <div style={styles.single as React.CSSProperties}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="r"
          value={rgb.r}
          onChange={handleChange}
          dragLabel={true}
          dragMax={255}
        />
      </div>
      <div style={styles.single as React.CSSProperties}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="g"
          value={rgb.g}
          onChange={handleChange}
          dragLabel={true}
          dragMax={255}
        />
      </div>
      <div style={styles.single as React.CSSProperties}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="b"
          value={rgb.b}
          onChange={handleChange}
          dragLabel={true}
          dragMax={255}
        />
      </div>
      <div style={styles.alpha as React.CSSProperties}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="a"
          value={Math.round((rgb.a ?? 1) * 100)}
          onChange={handleChange}
          dragLabel={true}
          dragMax={100}
        />
      </div>
    </div>
  )
}

export default SketchFields
