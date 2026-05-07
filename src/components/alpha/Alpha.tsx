import React, { FC } from 'react'
import reactCSS from '../../reactcss'
import { ColorWrap, Alpha } from '../common'
import AlphaPointer from './AlphaPointer'
import { HSL, RGB } from '../../types'

export interface AlphaPickerProps {
  rgb: RGB;
  hsl: HSL;
  width?: string | number;
  height?: string | number;
  onChange?: (color: any, e: any) => void;
  direction?: 'horizontal' | 'vertical';
  style?: any;
  renderers?: any;
  pointer?: FC<any>;
  className?: string;
}

export const AlphaPicker: FC<AlphaPickerProps> = ({
  rgb,
  hsl,
  width = '316px',
  height = '16px',
  onChange,
  direction = 'horizontal',
  style,
  renderers,
  pointer = AlphaPointer,
  className = ''
}) => {
  const styles = reactCSS({
    'default': {
      picker: {
        position: 'relative',
        width,
        height,
      },
      alpha: {
        radius: '2px',
        style,
      },
    },
  })

  return (
    <div style={styles.picker as React.CSSProperties} className={`alpha-picker ${className}`}>
      <Alpha
        {...styles.alpha}
        rgb={rgb}
        hsl={hsl}
        pointer={pointer}
        renderers={renderers}
        onChange={onChange}
        direction={direction}
      />
    </div>
  )
}

export default ColorWrap(AlphaPicker)
