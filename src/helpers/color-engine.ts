/**
 * Internal Color Engine
 * Inspired by tinycolor2 (Brian Grinstead, MIT License)
 * Optimized for TypeScript and modern React environments.
 */

// --- Types ---

export interface RGB { r: number; g: number; b: number; a?: number }
export interface HSL { h: number; s: number; l: number; a?: number }
export interface HSV { h: number; s: number; v: number; a?: number }

export interface ParsedColor {
  ok: boolean;
  r: number;
  g: number;
  b: number;
  a: number;
  format?: string;
}

// --- Constants & Matchers ---

const NAMES: Record<string, string> = {
  aliceblue: "f0f8ff", antiquewhite: "faebd7", aqua: "0ff", aquamarine: "7fffd4", azure: "f0ffff",
  beige: "f5f5dc", bisque: "ffe4c4", black: "000", blanchedalmond: "ffebcd", blue: "00f",
  blueviolet: "8a2be2", brown: "a52a2a", burlywood: "deb887", burntsienna: "ea7e5d", cadetblue: "5f9ea0",
  chartreuse: "7fff00", chocolate: "d2691e", coral: "ff7f50", cornflowerblue: "6495ed", cornsilk: "fff8dc",
  crimson: "dc143c", cyan: "0ff", darkblue: "00008b", darkcyan: "008b8b", darkgoldenrod: "b8860b",
  darkgray: "a9a9a9", darkgreen: "006400", darkgrey: "a9a9a9", darkkhaki: "bdb76b", darkmagenta: "8b008b",
  darkolivegreen: "556b2f", darkorange: "ff8c00", darkorchid: "9932cc", darkred: "8b0000", darksalmon: "e9967a",
  darkseagreen: "8fbc8f", darkslateblue: "483d8b", darkslategray: "2f4f4f", darkslategrey: "2f4f4f", darkturquoise: "00ced1",
  darkviolet: "9400d3", deeppink: "ff1493", deepskyblue: "00bfff", dimgray: "696969", dimgrey: "696969",
  dodgerblue: "1e90ff", firebrick: "b22222", floralwhite: "fffaf0", forestgreen: "228b22", fuchsia: "f0f",
  gainsboro: "dcdcdc", ghostwhite: "f8f8ff", gold: "ffd700", goldenrod: "daa520", gray: "808080",
  green: "008000", greenyellow: "adff2f", grey: "808080", honeydew: "f0fff0", hotpink: "ff69b4",
  indianred: "cd5c5c", indigo: "4b0082", ivory: "fffff0", khaki: "f0e68c", lavender: "e6e6fa",
  lavenderblush: "fff0f5", lawngreen: "7cfc00", lemonchiffon: "fffacd", lightblue: "add8e6", lightcoral: "f08080",
  lightcyan: "e0ffff", lightgoldenrodyellow: "fafad2", lightgray: "d3d3d3", lightgreen: "90ee90", lightgrey: "d3d3d3",
  lightpink: "ffb6c1", lightsalmon: "ffa07a", lightseagreen: "20b2aa", lightskyblue: "87cefa", lightslategray: "789",
  lightslategrey: "789", lightsteelblue: "b0c4de", lightyellow: "ffffe0", lime: "0f0", limegreen: "32cd32",
  linen: "faf0e6", magenta: "f0f", maroon: "800000", mediumaquamarine: "66cdaa", mediumblue: "0000cd",
  mediumorchid: "ba55d3", mediumpurple: "9370db", mediumseagreen: "3cb371", mediumslateblue: "7b68ee", mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc", mediumvioletred: "c71585", midnightblue: "191970", mintcream: "f5fffa", mistyrose: "ffe4e1",
  moccasin: "ffe4b5", navajowhite: "ffdead", navy: "000080", oldlace: "fdf5e6", olive: "808000",
  olivedrab: "6b8e23", orange: "ffa500", orangered: "ff4500", orchid: "da70d6", palegoldenrod: "eee8aa",
  palegreen: "98fb98", paleturquoise: "afeeee", palevioletred: "db7093", papayawhip: "ffefd5", peachpuff: "ffdab9",
  peru: "cd853f", pink: "ffc0cb", plum: "dda0dd", powderblue: "b0e0e6", purple: "800080",
  rebeccapurple: "663399", red: "f00", rosybrown: "bc8f8f", royalblue: "4169e1", saddlebrown: "8b4513",
  salmon: "fa8072", sandybrown: "f4a460", seagreen: "2e8b57", seashell: "fff5ee", sienna: "a0522d",
  silver: "c0c0c0", skyblue: "87ceeb", slateblue: "6a5acd", slategray: "708090", slategrey: "708090",
  snow: "fffafa", springgreen: "00ff7f", steelblue: "4682b4", tan: "d2b48c", teal: "008080",
  thistle: "d8bfd8", tomato: "ff6347", turquoise: "40e0d0", violet: "ee82ee", wheat: "f5deb3",
  white: "fff", whitesmoke: "f5f5f5", yellow: "ff0", yellowgreen: "9acd32"
};

const CSS_INTEGER = "[-\\+]?\\d+%?";
const CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
const CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
const PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
const PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

const matchers = {
  CSS_UNIT: new RegExp(CSS_UNIT),
  rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
  rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
  hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
  hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
  hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
  hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};

// --- Utilities ---

function isOnePointZero(n: any): boolean {
  return typeof n === "string" && n.indexOf(".") !== -1 && parseFloat(n) === 1;
}

function bound01(n: any, max: number): number {
  if (isOnePointZero(n)) n = "100%";
  const isPercent = typeof n === "string" && n.indexOf("%") !== -1;
  n = Math.min(max, Math.max(0, parseFloat(n)));
  if (isPercent) n = (n * max) / 100;
  if (Math.abs(n - max) < 0.000001) return 1;
  return (n % max) / parseFloat(String(max));
}

function boundAlpha(a: any): number {
  a = parseFloat(a);
  if (isNaN(a) || a < 0 || a > 1) a = 1;
  return a;
}

function pad2(c: string): string {
  return c.length === 1 ? "0" + c : "" + c;
}

// --- Conversions ---

export function rgbToHsl(r: number, g: number, b: number): HSL {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s, l };
}

export function hslToRgb(h: number, s: number, l: number): RGB {
  let r, g, b;
  h = bound01(h, 360);
  s = bound01(s, 100);
  l = bound01(l, 100);
  function hue2rgb(p: number, q: number, t: number) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: r * 255, g: g * 255, b: b * 255 };
}

export function rgbToHsv(r: number, g: number, b: number): HSV {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0;
  const v = max;
  const d = max - min;
  const s = max === 0 ? 0 : d / max;
  if (max !== min) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s, v };
}

export function hsvToRgb(h: number, s: number, v: number): RGB {
  h = bound01(h, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);
  const i = Math.floor(h), f = h - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
  const mod = i % 6;
  const r = [v, q, p, p, t, v][mod], g = [t, v, v, q, p, p][mod], b = [p, p, t, v, v, q][mod];
  return { r: r * 255, g: g * 255, b: b * 255 };
}

export function rgbToHex(r: number, g: number, b: number, allow3Char?: boolean): string {
  const hex = [
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16))
  ];
  if (allow3Char && hex[0][0] === hex[0][1] && hex[1][0] === hex[1][1] && hex[2][0] === hex[2][1]) {
    return hex[0][0] + hex[1][0] + hex[2][0];
  }
  return hex.join("");
}

// --- Main Parser ---

function stringInputToObject(color: string): any {
  color = color.trim().toLowerCase();
  if (color === "transparent") return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  if (NAMES[color]) color = NAMES[color];

  let match;
  if ((match = matchers.rgb.exec(color))) return { r: match[1], g: match[2], b: match[3] };
  if ((match = matchers.rgba.exec(color))) return { r: match[1], g: match[2], b: match[3], a: match[4] };
  if ((match = matchers.hsl.exec(color))) return { h: match[1], s: match[2], l: match[3] };
  if ((match = matchers.hsla.exec(color))) return { h: match[1], s: match[2], l: match[3], a: match[4] };
  if ((match = matchers.hsv.exec(color))) return { h: match[1], s: match[2], v: match[3] };
  if ((match = matchers.hsva.exec(color))) return { h: match[1], s: match[2], v: match[3], a: match[4] };
  if ((match = matchers.hex8.exec(color))) return { r: parseInt(match[1], 16), g: parseInt(match[2], 16), b: parseInt(match[3], 16), a: parseInt(match[4], 16) / 255, format: "hex8" };
  if ((match = matchers.hex6.exec(color))) return { r: parseInt(match[1], 16), g: parseInt(match[2], 16), b: parseInt(match[3], 16), format: "hex" };
  if ((match = matchers.hex4.exec(color))) return { r: parseInt(match[1] + match[1], 16), g: parseInt(match[2] + match[2], 16), b: parseInt(match[3] + match[3], 16), a: parseInt(match[4] + match[4], 16) / 255, format: "hex8" };
  if ((match = matchers.hex3.exec(color))) return { r: parseInt(match[1] + match[1], 16), g: parseInt(match[2] + match[2], 16), b: parseInt(match[3] + match[3], 16), format: "hex" };

  return false;
}

export function parseColor(input: any): ParsedColor {
  let r = 0, g = 0, b = 0, a = 1, ok = false, format = "";

  if (typeof input === "string") input = stringInputToObject(input);
  if (typeof input === "object" && input !== null) {
    if (input.r !== undefined && input.g !== undefined && input.b !== undefined) {
      const rgb = { r: bound01(input.r, 255) * 255, g: bound01(input.g, 255) * 255, b: bound01(input.b, 255) * 255 };
      r = rgb.r; g = rgb.g; b = rgb.b; ok = true;
    } else if (input.h !== undefined && input.s !== undefined && input.v !== undefined) {
      const s = (typeof input.s === "string" && input.s.indexOf("%") !== -1) ? input.s : (input.s <= 1 ? (input.s * 100) + "%" : input.s);
      const v = (typeof input.v === "string" && input.v.indexOf("%") !== -1) ? input.v : (input.v <= 1 ? (input.v * 100) + "%" : input.v);
      const rgb = hsvToRgb(input.h, s, v);
      r = rgb.r; g = rgb.g; b = rgb.b; ok = true;
    } else if (input.h !== undefined && input.s !== undefined && input.l !== undefined) {
      const s = (typeof input.s === "string" && input.s.indexOf("%") !== -1) ? input.s : (input.s <= 1 ? (input.s * 100) + "%" : input.s);
      const l = (typeof input.l === "string" && input.l.indexOf("%") !== -1) ? input.l : (input.l <= 1 ? (input.l * 100) + "%" : input.l);
      const rgb = hslToRgb(input.h, s, l);
      r = rgb.r; g = rgb.g; b = rgb.b; ok = true;
    }
    if (input.a !== undefined) a = boundAlpha(input.a);
  }

  return { ok, r, g, b, a, format: input?.format || format };
}
