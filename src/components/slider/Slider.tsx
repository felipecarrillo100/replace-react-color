import React, { FC } from 'react'
import reactCSS from '../../reactcss'
import { merge } from '../../helpers/utils'
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
}

export const Slider: FC<SliderProps> = ({
  hsl,
  onChange,
  pointer = SliderPointer,
  styles: passedStyles = {},
  className = ''
}) => {
  const styles = reactCSS(merge({
    'default': {
      hue: {
        height: '12px',
        position: 'relative',
      },
      Hue: {
        radius: '2px',
      },
      wrap: {},
      swatches: {},
    },
  }, passedStyles))

  return (
    <div style={styles.wrap as React.CSSProperties} className={`slider-picker ${className}`}>
      <div style={styles.hue as React.CSSProperties}>
        <Hue
          style={styles.Hue}
          hsl={hsl}
          pointer={pointer}
          onChange={onChange}
        />
      </div>
      <div style={styles.swatches as React.CSSProperties}>
        <SliderSwatches hsl={hsl} onClick={onChange} />
      </div>
    </div>
  )
}

export default ColorWrap(Slider)
