import React, { FC } from 'react'
import { mergeStyles } from '../../helpers/styles'
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
  /** Legacy styles prop */
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
  style: legacyStyles,
  renderers,
  pointer = AlphaPointer,
  className = ''
}) => {
  const baseStyles: Record<string, React.CSSProperties> = {
    picker: {
      position: 'relative',
      width,
      height,
    },
  }

  const styles = mergeStyles(baseStyles, legacyStyles)

  return (
    <div style={styles.picker} className={`alpha-picker ${className}`}>
      <Alpha
        rgb={rgb}
        hsl={hsl}
        pointer={pointer}
        renderers={renderers}
        onChange={onChange}
        direction={direction}
        radius="2px"
        style={legacyStyles?.alpha}
      />
    </div>
  )
}

export default ColorWrap(AlphaPicker)
