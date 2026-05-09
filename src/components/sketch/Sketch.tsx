import React, { FC } from 'react'
import { mergeStyles } from '../../helpers/styles'

import { ColorWrap, Saturation, Hue, Alpha, Checkboard } from '../common'
import SketchFields from './SketchFields'
import SketchPresetColors from './SketchPresetColors'
import { HSL, HSV, RGB } from '../../types'

/**
 * Props for the SketchColor picker component.
 */
export interface SketchProps {
  /** The width of the picker component */
  width?: string | number;
  /** The currently selected color represented as RGB */
  rgb: RGB;
  /** The currently selected color represented as a Hex string */
  hex: string;
  /** The currently selected color represented as HSV */
  hsv: HSV;
  /** The currently selected color represented as HSL */
  hsl: HSL;
  /** Callback fired when the color changes */
  onChange?: (color: any, e: any) => void;
  /** Callback fired when a preset swatch is hovered */
  onSwatchHover?: (color: any, e: React.MouseEvent) => void;
  /** If true, the alpha channel slider is hidden */
  disableAlpha?: boolean;
  /** A list of hex string preset colors to display at the bottom */
  presetColors?: (string | { color: string; title?: string })[];
  /** Custom renderers for internal sub-components */
  renderers?: any;
  /** Custom styles to override the default aesthetic */
  styles?: any;
  /** Optional classname applied to the root element */
  className?: string;
  /** Optional style applied to the root element */
  style?: React.CSSProperties;
}

/**
 * The classic Sketch Color Picker.
 * This is one of the most popular pickers, resembling the Sketch App color picker.
 */
export const Sketch: FC<SketchProps> = ({
  width = 200,
  rgb,
  hex,
  hsv,
  hsl,
  onChange,
  onSwatchHover,
  disableAlpha = false,
  presetColors = ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505',
    '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000',
    '#4A4A4A', '#9B9B9B', '#FFFFFF'],
  renderers,
  styles: passedStyles = {},
  className = '',
  style = {}
}) => {
  const baseStyles: any = {
    picker: {
      width,
      padding: '10px 10px 0',
      boxSizing: 'initial',
      background: '#fff',
      borderRadius: '4px',
      boxShadow: '0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15)',
      ...style,
    },
    saturation: {
      width: '100%',
      paddingBottom: '75%',
      position: 'relative',
      overflow: 'hidden',
    },
    Saturation: {
      radius: '3px',
      shadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
    },
    controls: {
      display: 'flex',
    },
    sliders: {
      padding: '4px 0',
      flex: '1',
    },
    color: {
      width: '24px',
      height: disableAlpha ? '10px' : '24px',
      position: 'relative',
      marginTop: '4px',
      marginLeft: '4px',
      borderRadius: '3px',
    },
    activeColor: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      borderRadius: '2px',
      background: `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`,
      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
    },
    hue: {
      position: 'relative',
      height: '10px',
      overflow: 'hidden',
    },
    Hue: {
      radius: '2px',
      shadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
    },
    alpha: {
      position: 'relative',
      height: '10px',
      marginTop: '4px',
      overflow: 'hidden',
      display: disableAlpha ? 'none' : 'block',
    },
    Alpha: {
      radius: '2px',
      shadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
    },
  }

  const styles = mergeStyles(baseStyles, passedStyles)

  return (
    <div style={styles.picker} className={`sketch-picker ${className}`}>
      <div style={styles.saturation}>
        <Saturation
          style={styles.Saturation}
          hsl={hsl}
          hsv={hsv}
          onChange={onChange}
        />
      </div>
      <div style={styles.controls} className="flexbox-fix">
        <div style={styles.sliders}>
          <div style={styles.hue}>
            <Hue
              style={styles.Hue}
              hsl={hsl}
              onChange={onChange}
            />
          </div>
          <div style={styles.alpha}>
            <Alpha
              style={styles.Alpha}
              rgb={rgb}
              hsl={hsl}
              renderers={renderers}
              onChange={onChange}
            />
          </div>
        </div>
        <div style={styles.color}>
          <Checkboard />
          <div style={styles.activeColor} />
        </div>
      </div>

      <SketchFields
        rgb={rgb}
        hsl={hsl}
        hex={hex}
        onChange={onChange}
        disableAlpha={disableAlpha}
      />
      <SketchPresetColors
        colors={presetColors}
        onClick={onChange}
        onSwatchHover={onSwatchHover}
      />
    </div>
  )
}

export default ColorWrap(Sketch)
