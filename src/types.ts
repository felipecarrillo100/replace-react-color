export interface HSL {
  h: number;
  s: number;
  l: number;
  a?: number;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
  a?: number;
}

export type Color = string | RGB | HSL | HSV;

export interface ColorState {
  hsl: HSL;
  hex: string;
  rgb: RGB;
  hsv: HSV;
  oldHue: number;
  source?: string;
}
