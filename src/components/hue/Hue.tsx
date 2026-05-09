import React, { FC } from 'react'
import { mergeStyles } from '../../helpers/styles'
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
  style?: React.CSSProperties;
}

export const HuePicker: FC<HuePickerProps> = ({
  width = '316px',
  height = '16px',
  onChange,
  hsl,
  direction = 'horizontal',
  pointer = HuePointer,
  styles: passedStyles = {},
  className = '',
  style = {}
}) => {
  const baseStyles: Record<string, React.CSSProperties> = {
    picker: {
      position: 'relative',
      width,
      height,
      ...style,
    },
  }

  const styles = mergeStyles(baseStyles, passedStyles)

  // Overwrite to provide pure hue color
  const handleChange = (data: any) => onChange && onChange({ a: 1, h: data.h, l: 0.5, s: 1 })

  return (
    <div style={styles.picker} className={`hue-picker ${className}`}>
      <Hue
        hsl={hsl}
        pointer={pointer}
        onChange={handleChange}
        direction={direction}
        radius="2px"
        style={passedStyles?.hue}
      />
    </div>
  )
}

export default ColorWrap(HuePicker)
