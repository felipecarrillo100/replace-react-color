import React, { FC } from 'react'
import { mergeStyles } from '../../helpers/styles'

import { ColorWrap, Saturation, Hue, Alpha, Checkboard } from '../common'
import ChromeFields from './ChromeFields'
import ChromePointer from './ChromePointer'
import ChromePointerCircle from './ChromePointerCircle'
import { HSL, HSV, RGB } from '../../types'

export interface ChromeProps {
  width?: string | number;
  onChange?: (color: any, e: any) => void;
  disableAlpha?: boolean;
  rgb: RGB;
  hsl: HSL;
  hsv: HSV;
  hex: string;
  renderers?: any;
  styles?: any;
  className?: string;
  style?: React.CSSProperties;
  defaultView?: 'hex' | 'rgb' | 'hsl';
}

export const Chrome: FC<ChromeProps> = ({
  width = 225,
  onChange,
  disableAlpha = false,
  rgb,
  hsl,
  hsv,
  hex,
  renderers,
  styles: passedStyles = {},
  className = '',
  style = {},
  defaultView
}) => {
  const baseStyles: any = {
    picker: {
      width,
      background: '#fff',
      borderRadius: '2px',
      boxShadow: '0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3)',
      boxSizing: 'initial',
      fontFamily: 'Menlo',
      ...style,
    },
    saturation: {
      width: '100%',
      paddingBottom: '55%',
      position: 'relative',
      borderRadius: '2px 2px 0 0',
      overflow: 'hidden',
    },
    Saturation: {
      radius: '2px 2px 0 0',
    },
    body: {
      padding: '16px 16px 12px',
    },
    controls: {
      display: 'flex',
    },
    color: {
      width: disableAlpha ? '22px' : '32px',
    },
    swatch: {
      marginTop: disableAlpha ? '0px' : '6px',
      width: disableAlpha ? '10px' : '16px',
      height: disableAlpha ? '10px' : '16px',
      borderRadius: '8px',
      position: 'relative',
      overflow: 'hidden',
    },
    active: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      borderRadius: '8px',
      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.1)',
      background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`,
      zIndex: 2,
    },
    toggles: {
      flex: '1',
    },
    hue: {
      height: '10px',
      position: 'relative',
      marginBottom: disableAlpha ? '0px' : '8px',
    },
    Hue: {
      radius: '2px',
    },
    alpha: {
      height: '10px',
      position: 'relative',
      display: disableAlpha ? 'none' : 'block',
    },
    Alpha: {
      radius: '2px',
    },
  }

  const styles = mergeStyles(baseStyles, passedStyles)

  return (
    <div style={styles.picker} className={`chrome-picker ${className}`}>
      <div style={styles.saturation}>
        <Saturation
          style={styles.Saturation}
          hsl={hsl}
          hsv={hsv}
          pointer={ChromePointerCircle}
          onChange={onChange}
        />
      </div>
      <div style={styles.body}>
        <div style={styles.controls} className="flexbox-fix">
          <div style={styles.color}>
            <div style={styles.swatch}>
              <div style={styles.active} />
              <Checkboard renderers={renderers} />
            </div>
          </div>
          <div style={styles.toggles}>
            <div style={styles.hue}>
              <Hue
                style={styles.Hue}
                hsl={hsl}
                pointer={ChromePointer}
                onChange={onChange}
              />
            </div>
            <div style={styles.alpha}>
              <Alpha
                style={styles.Alpha}
                rgb={rgb}
                hsl={hsl}
                pointer={ChromePointer}
                renderers={renderers}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <ChromeFields
          rgb={rgb}
          hsl={hsl}
          hex={hex}
          view={defaultView}
          onChange={onChange}
          disableAlpha={disableAlpha}
        />
      </div>
    </div>
  )
}

export default ColorWrap(Chrome)
