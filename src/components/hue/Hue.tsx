import React, { FC } from 'react'
import reactCSS from '../../reactcss'
import { merge } from '../../helpers/utils'
import { ColorWrap, Hue } from '../common'
import HuePointer from './HuePointer'
import { HSL } from '../../types'

export interface HuePickerProps {
  width?: string | number;
  height?: string | number;
  onChange?: (color: any) => void;
  hsl: HSL;
  direction?: 'horizontal' | 'vertical';
  pointer?: FC<any>;
  styles?: any;
  className?: string;
}

export const HuePicker: FC<HuePickerProps> = ({
  width = '316px',
  height = '16px',
  onChange,
  hsl,
  direction = 'horizontal',
  pointer = HuePointer,
  styles: passedStyles = {},
  className = ''
}) => {
  const styles = reactCSS(merge({
    'default': {
      picker: {
        position: 'relative',
        width,
        height,
      },
      hue: {
        radius: '2px',
      },
    },
  }, passedStyles))

  // Overwrite to provide pure hue color
  const handleChange = (data: any) => onChange && onChange({ a: 1, h: data.h, l: 0.5, s: 1 })

  return (
    <div style={styles.picker as React.CSSProperties} className={`hue-picker ${className}`}>
      <Hue
        {...styles.hue}
        hsl={hsl}
        pointer={pointer}
        onChange={handleChange}
        direction={direction}
      />
    </div>
  )
}

export default ColorWrap(HuePicker)
