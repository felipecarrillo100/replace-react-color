import React, { FC, useState } from 'react'
import reactCSS from '../../reactcss'
import { merge } from '../../helpers/utils'

import { ColorWrap, Saturation, Hue } from '../common'
import PhotoshopFields from './PhotoshopFields'
import PhotoshopPointerCircle from './PhotoshopPointerCircle'
import PhotoshopPointer from './PhotoshopPointer'
import PhotoshopButton from './PhotoshopButton'
import PhotoshopPreviews from './PhotoshopPreviews'
import { HSL, HSV, RGB } from '../../types'

export interface PhotoshopProps {
  header?: string;
  styles?: any;
  className?: string;
  hex: string;
  hsl: HSL;
  hsv: HSV;
  rgb: RGB;
  onChange?: (color: any, e: any) => void;
  onAccept?: (color: any, e: React.MouseEvent) => void;
  onCancel?: (color: any, e: React.MouseEvent) => void;
}

export const Photoshop: FC<PhotoshopProps> = ({
  header = 'Color Picker',
  styles: passedStyles = {},
  className = '',
  hex,
  hsl,
  hsv,
  rgb,
  onChange,
  onAccept,
  onCancel
}) => {
  const [currentColor] = useState(hex)

  const styles = reactCSS(merge({
    'default': {
      picker: {
        background: '#DCDCDC',
        borderRadius: '4px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.25), 0 8px 16px rgba(0,0,0,.15)',
        boxSizing: 'initial',
        width: '513px',
      },
      head: {
        backgroundImage: 'linear-gradient(-180deg, #F0F0F0 0%, #D4D4D4 100%)',
        borderBottom: '1px solid #B1B1B1',
        boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,.2), inset 0 -1px 0 0 rgba(0,0,0,.02)',
        height: '23px',
        lineHeight: '24px',
        borderRadius: '4px 4px 0 0',
        fontSize: '13px',
        color: '#4D4D4D',
        textAlign: 'center',
      },
      body: {
        padding: '15px 15px 0',
        display: 'flex',
      },
      saturation: {
        width: '256px',
        height: '256px',
        position: 'relative',
        border: '2px solid #B3B3B3',
        borderBottom: '2px solid #F0F0F0',
        overflow: 'hidden',
      },
      hue: {
        position: 'relative',
        height: '256px',
        width: '19px',
        marginLeft: '10px',
        border: '2px solid #B3B3B3',
        borderBottom: '2px solid #F0F0F0',
      },
      controls: {
        width: '180px',
        marginLeft: '10px',
      },
      top: {
        display: 'flex',
      },
      previews: {
        width: '60px',
      },
      actions: {
        flex: '1',
        marginLeft: '20px',
      },
    },
  }, passedStyles))

  return (
    <div style={styles.picker as React.CSSProperties} className={`photoshop-picker ${className}`}>
      <div style={styles.head as React.CSSProperties}>{header}</div>

      <div style={styles.body as React.CSSProperties} className="flexbox-fix">
        <div style={styles.saturation as React.CSSProperties}>
          <Saturation
            hsl={hsl}
            hsv={hsv}
            pointer={PhotoshopPointerCircle}
            onChange={onChange}
          />
        </div>
        <div style={styles.hue as React.CSSProperties}>
          <Hue
            direction="vertical"
            hsl={hsl}
            pointer={PhotoshopPointer}
            onChange={onChange}
          />
        </div>
        <div style={styles.controls as React.CSSProperties}>
          <div style={styles.top as React.CSSProperties} className="flexbox-fix">
            <div style={styles.previews as React.CSSProperties}>
              <PhotoshopPreviews
                rgb={rgb}
                currentColor={currentColor}
              />
            </div>
            <div style={styles.actions as React.CSSProperties}>
              <PhotoshopButton label="OK" onClick={(e) => onAccept && onAccept(hex, e)} active />
              <PhotoshopButton label="Cancel" onClick={(e) => onCancel && onCancel(hex, e)} />
              <PhotoshopFields
                onChange={onChange}
                rgb={rgb}
                hsv={hsv}
                hex={hex}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorWrap(Photoshop)
