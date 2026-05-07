import React, { FC, useState, useEffect, useCallback } from 'react'
import reactCSS from '../../reactcss'
import * as color from '../../helpers/color'
import { EditableInput, UnfoldMoreHorizontalIcon } from '../common'
import { HSL, RGB } from '../../types'

export interface ChromeFieldsProps {
  hsl: HSL;
  rgb: RGB;
  hex: string;
  view?: 'hex' | 'rgb' | 'hsl';
  onChange?: (color: any, e: any) => void;
  disableAlpha?: boolean;
}

export const ChromeFields: FC<ChromeFieldsProps> = ({
  hsl,
  rgb,
  hex,
  view: viewProp = 'hex',
  onChange,
  disableAlpha
}) => {
  const [view, setView] = useState<'hex' | 'rgb' | 'hsl'>(() => {
    if (hsl.a !== 1 && viewProp === 'hex') {
      return 'rgb'
    }
    return viewProp
  })

  useEffect(() => {
    if (hsl.a !== 1 && view === 'hex') {
      setView('rgb')
    }
  }, [hsl.a, view])

  const toggleViews = useCallback(() => {
    if (view === 'hex') {
      setView('rgb')
    } else if (view === 'rgb') {
      setView('hsl')
    } else if (view === 'hsl') {
      if (hsl.a === 1) {
        setView('hex')
      } else {
        setView('rgb')
      }
    }
  }, [view, hsl.a])

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
        source: 'rgb',
      }, e)
    } else if (data.a !== undefined) {
      let a = data.a
      if (a < 0) {
        a = 0
      } else if (a > 1) {
        a = 1
      }

      onChange({
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a: Math.round(a * 100) / 100,
        source: 'rgb',
      }, e)
    } else if (data.h || data.s || data.l) {
      // Remove any occurances of '%'.
      if (typeof (data.s) === 'string' && data.s.includes('%')) { data.s = data.s.replace('%', '') }
      if (typeof (data.l) === 'string' && data.l.includes('%')) { data.l = data.l.replace('%', '') }

      // We store HSL as a unit interval so we need to override the 1 input to 0.01
      if (data.s == 1) {
        data.s = 0.01
      } else if (data.l == 1) {
        data.l = 0.01
      }

      onChange({
        h: data.h || hsl.h,
        s: Number(data.s !== undefined ? data.s : hsl.s),
        l: Number(data.l !== undefined ? data.l : hsl.l),
        source: 'hsl',
      }, e)
    }
  }, [onChange, rgb, hsl])

  const showHighlight = (e: React.MouseEvent) => {
    (e.currentTarget as unknown as HTMLElement).style.background = '#eee'
  }

  const hideHighlight = (e: React.MouseEvent) => {
    (e.currentTarget as unknown as HTMLElement).style.background = 'transparent'
  }

  const styles = reactCSS({
    'default': {
      wrap: {
        paddingTop: '16px',
        display: 'flex',
      },
      fields: {
        flex: '1',
        display: 'flex',
        marginLeft: '-6px',
      },
      field: {
        paddingLeft: '6px',
        width: '100%',
      },
      alpha: {
        paddingLeft: '6px',
        width: '100%',
      },
      toggle: {
        width: '32px',
        textAlign: 'right',
        position: 'relative',
      },
      icon: {
        marginRight: '-4px',
        marginTop: '12px',
        cursor: 'pointer',
        position: 'relative',
      },
      input: {
        fontSize: '11px',
        color: '#333',
        width: '100%',
        borderRadius: '2px',
        border: 'none',
        boxShadow: 'inset 0 0 0 1px #dadada',
        height: '21px',
        textAlign: 'center',
      },
      label: {
        textTransform: 'uppercase',
        fontSize: '11px',
        lineHeight: '11px',
        color: '#969696',
        textAlign: 'center',
        display: 'block',
        marginTop: '12px',
      },
      svg: {
        fill: '#333',
        width: '24px',
        height: '24px',
        border: '1px transparent solid',
        borderRadius: '5px',
      },
    },
    'disableAlpha': {
      alpha: {
        display: 'none',
      },
    },
  }, { disableAlpha })

  let fields
  if (view === 'hex') {
    fields = (
      <div style={styles.fields as React.CSSProperties} className="flexbox-fix">
        <div style={styles.field as React.CSSProperties}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="hex" value={hex}
            onChange={handleChange}
          />
        </div>
      </div>
    )
  } else if (view === 'rgb') {
    fields = (
      <div style={styles.fields as React.CSSProperties} className="flexbox-fix">
        <div style={styles.field as React.CSSProperties}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="r"
            value={rgb.r}
            onChange={handleChange}
          />
        </div>
        <div style={styles.field as React.CSSProperties}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="g"
            value={rgb.g}
            onChange={handleChange}
          />
        </div>
        <div style={styles.field as React.CSSProperties}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="b"
            value={rgb.b}
            onChange={handleChange}
          />
        </div>
        <div style={styles.alpha as React.CSSProperties}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="a"
            value={rgb.a ?? 1}
            arrowOffset={0.01}
            onChange={handleChange}
          />
        </div>
      </div>
    )
  } else if (view === 'hsl') {
    fields = (
      <div style={styles.fields as React.CSSProperties} className="flexbox-fix">
        <div style={styles.field as React.CSSProperties}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="h"
            value={Math.round(hsl.h)}
            onChange={handleChange}
          />
        </div>
        <div style={styles.field as React.CSSProperties}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="s"
            value={`${Math.round(hsl.s * 100)}%`}
            onChange={handleChange}
          />
        </div>
        <div style={styles.field as React.CSSProperties}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="l"
            value={`${Math.round(hsl.l * 100)}%`}
            onChange={handleChange}
          />
        </div>
        <div style={styles.alpha as React.CSSProperties}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="a"
            value={hsl.a ?? 1}
            arrowOffset={0.01}
            onChange={handleChange}
          />
        </div>
      </div>
    )
  }

  return (
    <div style={styles.wrap as React.CSSProperties} className="flexbox-fix">
      {fields}
      <div style={styles.toggle as React.CSSProperties}>
        <div style={styles.icon as React.CSSProperties} onClick={toggleViews}>
          <UnfoldMoreHorizontalIcon
            style={styles.svg}
            onMouseOver={showHighlight}
            onMouseEnter={showHighlight}
            onMouseOut={hideHighlight}
          />
        </div>
      </div>
    </div>
  )
}

export default ChromeFields
