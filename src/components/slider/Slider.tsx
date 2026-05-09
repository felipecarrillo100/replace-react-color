import React, { FC } from 'react'
import { mergeStyles } from '../../helpers/styles'
import { ColorWrap, Hue } from '../common'
import SliderSwatches from './SliderSwatches'
import SliderPointer from './SliderPointer'
import { HSL } from '../../types'

export interface SliderProps {
  hsl: HSL;
  onChange?: (color: any, e: any) => void;
  pointer?: FC<any>;
  styles?: any;
  className?: string;
  style?: React.CSSProperties;
}

export const Slider: FC<SliderProps> = ({
  hsl,
  onChange,
  pointer = SliderPointer,
  styles: passedStyles = {},
  className = '',
  style = {}
}) => {
  const baseStyles: any = {
    hue: {
      height: '12px',
      position: 'relative',
    },
    Hue: {
      radius: '2px',
    },
    wrap: {
      ...style,
    },
    swatches: {},
  }

  const styles = mergeStyles(baseStyles, passedStyles)

  return (
    <div style={styles.wrap} className={`slider-picker ${className}`}>
      <div style={styles.hue}>
        <Hue
          style={styles.Hue}
          hsl={hsl}
          pointer={pointer}
          onChange={onChange}
        />
      </div>
      <div style={styles.swatches}>
        <SliderSwatches hsl={hsl} onClick={onChange} />
      </div>
    </div>
  )
}

export default ColorWrap(Slider)
