import * as engine from './color-engine'
import { Color, ColorState } from '../types'

export const simpleCheckForValidColor = (data: any) => {
  const keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'l', 'v']
  let checked = 0
  let passed = 0
  keysToCheck.forEach((letter) => {
    if ((data as any)[letter] !== undefined) {
      checked += 1
      if (!isNaN((data as any)[letter])) {
        passed += 1
      }
      if (letter === 's' || letter === 'l') {
        const percentPatt = /^\d+%$/
        if (percentPatt.test((data as any)[letter])) {
          passed += 1
        }
      }
    }
  })
  return (checked === passed) ? data : false
}

export const toState = (data: Color | any, oldHue?: number): ColorState => {
  const col = engine.parseColor(data)
  const hsl = engine.rgbToHsl(col.r, col.g, col.b)
  const hsv = engine.rgbToHsv(col.r, col.g, col.b)
  const rgb = { r: Math.round(col.r), g: Math.round(col.g), b: Math.round(col.b), a: col.a }
  const hex = engine.rgbToHex(col.r, col.g, col.b)

  // Ensure alpha is preserved if it was explicitly passed
  hsl.a = col.a
  hsv.a = col.a
  rgb.a = col.a

  if (hsl.s === 0) {
    hsl.h = oldHue || 0
    hsv.h = oldHue || 0
  }
  const transparent = hex === '000000' && rgb.a === 0

  return {
    hsl,
    hex: transparent ? 'transparent' : `#${ hex }`,
    rgb,
    hsv,
    oldHue: data.h || oldHue || hsl.h,
    source: data.source,
  }
}

export const isValidHex = (hex: string) => {
  if (hex === 'transparent') {
    return true
  }
  // disable hex4 and hex8
  const lh = (String(hex).charAt(0) === '#') ? 1 : 0
  if (hex.length !== (4 + lh) && hex.length < (7 + lh)) {
    return engine.parseColor(hex).ok
  }
  return false
}

export const getContrastingColor = (data: Color) => {
  if (!data) {
    return '#fff'
  }
  const col = toState(data)
  if (col.hex === 'transparent') {
    return 'rgba(0,0,0,0.4)'
  }
  const yiq = ((col.rgb.r * 299) + (col.rgb.g * 587) + (col.rgb.b * 114)) / 1000
  return (yiq >= 128) ? '#000' : '#fff'
}

export const red: ColorState = {
  hsl: { a: 1, h: 0, l: 0.5, s: 1 },
  hex: '#ff0000',
  rgb: { r: 255, g: 0, b: 0, a: 1 },
  hsv: { h: 0, s: 1, v: 1, a: 1 },
  oldHue: 0,
}

export const isvalidColorString = (string: string, type: string) => {
  const stringWithoutDegree = string.replace('°', '')
  return engine.parseColor(`${ type } (${ stringWithoutDegree })`).ok
}
