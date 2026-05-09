import React, { FC } from 'react'
import { mergeStyles } from '../../helpers/styles'
import { ColorWrap, Saturation, Hue } from '../common'
import GooglePointerCircle from './GooglePointerCircle'
import GooglePointer from './GooglePointer'
import GoogleFields from './GoogleFields'
import { HSL, HSV, RGB } from '../../types'

export interface GoogleProps {
  width?: string | number;
  onChange?: (color: any, e: any) => void;
  rgb: RGB;
  hsl: HSL;
  hsv: HSV;
  hex: string;
  header?: string;
  styles?: any;
  className?: string;
  style?: React.CSSProperties;
}

export const Google: FC<GoogleProps> = ({
  width = 652,
  onChange,
  rgb,
  hsl,
  hsv,
  hex,
  header = 'Color picker',
  styles: passedStyles = {},
  className = '',
  style = {}
}) => {
  const baseStyles: any = {
    picker: {
      width,
      background: '#fff',
      border: '1px solid #dfe1e5',
      boxSizing: 'initial',
      display: 'flex',
      flexWrap: 'wrap',
      borderRadius: '8px 8px 0px 0px',
      ...style,
    },
    head: {
      height: '57px',
      width: '100%',
      paddingTop: '16px',
      paddingBottom: '16px',
      paddingLeft: '16px',
      fontSize: '20px',
      boxSizing: 'border-box',
      fontFamily: 'Roboto-Regular,HelveticaNeue,Arial,sans-serif',
    },
    saturation: {
      width: '70%',
      padding: '0px',
      position: 'relative',
      overflow: 'hidden',
    },
    swatch: {
      width: '30%',
      height: '228px',
      padding: '0px',
      background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`,
      position: 'relative',
      overflow: 'hidden',
    },
    body: {
      margin: 'auto',
      width: '95%',
    },
    controls: {
      display: 'flex',
      boxSizing: 'border-box',
      height: '52px',
      paddingTop: '22px',
    },
    color: {
      width: '32px',
    },
    hue: {
      height: '8px',
      position: 'relative',
      margin: '0px 16px 0px 16px',
      width: '100%',
    },
    Hue: {
      radius: '2px',
    },
  }

  const styles = mergeStyles(baseStyles, passedStyles)

  return (
    <div style={styles.picker} className={`google-picker ${className}`}>
      <div style={styles.head}>{header}</div>
      <div style={styles.swatch} />
      <div style={styles.saturation}>
        <Saturation
          hsl={hsl}
          hsv={hsv}
          pointer={GooglePointerCircle}
          onChange={onChange}
        />
      </div>
      <div style={styles.body}>
        <div style={styles.controls} className="flexbox-fix">
          <div style={styles.hue}>
            <Hue
              style={styles.Hue}
              hsl={hsl}
              pointer={GooglePointer}
              onChange={onChange}
            />
          </div>
        </div>
        <GoogleFields
          rgb={rgb}
          hsl={hsl}
          hex={hex}
          hsv={hsv}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default ColorWrap(Google)
