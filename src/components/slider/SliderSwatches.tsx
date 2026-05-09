import React, { FC } from 'react'
import SliderSwatch from './SliderSwatch'
import { HSL } from '../../types'

export interface SliderSwatchesProps {
  onClick?: (color: any, e: any) => void;
  hsl: HSL;
}

export const SliderSwatches: FC<SliderSwatchesProps> = ({ onClick, hsl }) => {
  const baseStyles: Record<string, React.CSSProperties> = {
    swatches: {
      marginTop: '20px',
    },
    swatch: {
      boxSizing: 'border-box',
      width: '20%',
      paddingRight: '1px',
      float: 'left',
    },
    clear: {
      clear: 'both',
    },
  }

  // Acceptible difference in floating point equality
  const epsilon = 0.1

  return (
    <div style={baseStyles.swatches}>
      <div style={baseStyles.swatch}>
        <SliderSwatch
          hsl={hsl}
          offset={0.80}
          active={Math.abs(hsl.l - 0.80) < epsilon
            && Math.abs(hsl.s - 0.50) < epsilon}
          onClick={onClick}
          first
        />
      </div>
      <div style={baseStyles.swatch}>
        <SliderSwatch
          hsl={hsl}
          offset={0.65}
          active={Math.abs(hsl.l - 0.65) < epsilon
            && Math.abs(hsl.s - 0.50) < epsilon}
          onClick={onClick}
        />
      </div>
      <div style={baseStyles.swatch}>
        <SliderSwatch
          hsl={hsl}
          offset={0.50}
          active={Math.abs(hsl.l - 0.50) < epsilon
            && Math.abs(hsl.s - 0.50) < epsilon}
          onClick={onClick}
        />
      </div>
      <div style={baseStyles.swatch}>
        <SliderSwatch
          hsl={hsl}
          offset={0.35}
          active={Math.abs(hsl.l - 0.35) < epsilon
            && Math.abs(hsl.s - 0.50) < epsilon}
          onClick={onClick}
        />
      </div>
      <div style={baseStyles.swatch}>
        <SliderSwatch
          hsl={hsl}
          offset={0.20}
          active={Math.abs(hsl.l - 0.20) < epsilon
            && Math.abs(hsl.s - 0.50) < epsilon}
          onClick={onClick}
          last
        />
      </div>
      <div style={baseStyles.clear} />
    </div>
  )
}

export default SliderSwatches
