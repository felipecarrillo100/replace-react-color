import React, { FC, ComponentType, ReactElement, ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface HSL {
    h: number;
    s: number;
    l: number;
    a?: number;
}
interface RGB {
    r: number;
    g: number;
    b: number;
    a?: number;
}
interface HSV {
    h: number;
    s: number;
    v: number;
    a?: number;
}
type Color = string | RGB | HSL | HSV;
interface ColorState {
    hsl: HSL;
    hex: string;
    rgb: RGB;
    hsv: HSV;
    oldHue: number;
    source?: string;
}

interface AlphaPickerProps {
    rgb: RGB;
    hsl: HSL;
    width?: string | number;
    height?: string | number;
    onChange?: (color: any, e: any) => void;
    direction?: 'horizontal' | 'vertical';
    style?: any;
    renderers?: any;
    pointer?: FC<any>;
    className?: string;
}
declare const _default$e: React.FC<AlphaPickerProps & ColorWrapProps>;

interface BlockProps {
    onChange?: (color: any, e: any) => void;
    onSwatchHover?: (color: string, e: React.MouseEvent) => void;
    hex: string;
    colors?: string[];
    width?: string | number;
    triangle?: 'top' | 'hide';
    styles?: any;
    className?: string;
}
declare const _default$d: React.FC<BlockProps & ColorWrapProps>;

interface CircleProps {
    width?: string | number;
    onChange?: (color: any, e: any) => void;
    onSwatchHover?: (color: string, e: React.MouseEvent) => void;
    colors?: string[];
    hex: string;
    circleSize?: number;
    circleSpacing?: number;
    styles?: any;
    className?: string;
}
declare const _default$c: React.FC<CircleProps & ColorWrapProps>;

interface ChromeProps {
    width?: string | number;
    onChange?: (color: any, e: any) => void;
    disableAlpha?: boolean;
    rgb: RGB;
    hsl: HSL;
    hsv: HSV;
    hex: string;
    renderers?: any;
    styles?: any;
    className?: string;
    defaultView?: 'hex' | 'rgb' | 'hsl';
}
declare const _default$b: React.FC<ChromeProps & ColorWrapProps>;

interface CompactProps {
    onChange?: (color: any, e: any) => void;
    onSwatchHover?: (color: string, e: React.MouseEvent) => void;
    colors?: string[];
    hex: string;
    rgb: RGB;
    styles?: any;
    className?: string;
}
declare const _default$a: React.FC<CompactProps & ColorWrapProps>;

interface GithubProps {
    width?: string | number;
    colors?: string[];
    onChange?: (color: any, e: any) => void;
    onSwatchHover?: (color: string, e: React.MouseEvent) => void;
    triangle?: 'hide' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    styles?: any;
    className?: string;
}
declare const _default$9: React.FC<GithubProps & ColorWrapProps>;

interface HuePickerProps {
    width?: string | number;
    height?: string | number;
    onChange?: (color: any) => void;
    hsl: HSL;
    direction?: 'horizontal' | 'vertical';
    pointer?: FC<any>;
    styles?: any;
    className?: string;
}
declare const _default$8: React.FC<HuePickerProps & ColorWrapProps>;

interface MaterialProps {
    onChange?: (color: any, e: any) => void;
    hex: string;
    rgb: RGB;
    styles?: any;
    className?: string;
}
declare const _default$7: React.FC<MaterialProps & ColorWrapProps>;

interface PhotoshopProps {
    header?: string;
    styles?: any;
    className?: string;
    hex: string;
    hsl: HSL;
    hsv: HSV;
    rgb: RGB;
    onChange?: (color: any, e: any) => void;
    onAccept?: (color: any, e: React.MouseEvent) => void;
    onCancel?: (color: any, e: React.MouseEvent) => void;
}
declare const _default$6: React.FC<PhotoshopProps & ColorWrapProps>;

/**
 * Props for the SketchColor picker component.
 */
interface SketchProps {
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
    presetColors?: (string | {
        color: string;
        title?: string;
    })[];
    /** Custom renderers for internal sub-components */
    renderers?: any;
    /** Custom styles to override the default aesthetic */
    styles?: any;
    /** Optional classname applied to the root element */
    className?: string;
}
declare const _default$5: React.FC<SketchProps & ColorWrapProps>;

interface SliderProps {
    hsl: HSL;
    onChange?: (color: any, e: any) => void;
    pointer?: FC<any>;
    styles?: any;
    className?: string;
}
declare const _default$4: React.FC<SliderProps & ColorWrapProps>;

interface SwatchesProps {
    width?: string | number;
    height?: string | number;
    onChange?: (color: any, e: any) => void;
    onSwatchHover?: (color: string, e: React.MouseEvent) => void;
    colors?: string[][];
    hex: string;
    styles?: any;
    className?: string;
}
declare const _default$3: React.FC<SwatchesProps & ColorWrapProps>;

interface TwitterProps {
    onChange?: (color: any, e: any) => void;
    onSwatchHover?: (color: string, e: React.MouseEvent) => void;
    hex: string;
    colors?: string[];
    width?: string | number;
    triangle?: 'hide' | 'top-left' | 'top-right';
    styles?: any;
    className?: string;
}
declare const _default$2: React.FC<TwitterProps & ColorWrapProps>;

interface GoogleProps {
    width?: string | number;
    onChange?: (color: any, e: any) => void;
    rgb: RGB;
    hsl: HSL;
    hsv: HSV;
    hex: string;
    header?: string;
    styles?: any;
    className?: string;
}
declare const _default$1: React.FC<GoogleProps & ColorWrapProps>;

interface ColorWrapProps {
    color?: Color;
    onChange?: (color: ColorState, event: React.ChangeEvent<any> | MouseEvent | TouchEvent) => void;
    onChangeComplete?: (color: ColorState, event: React.ChangeEvent<any> | MouseEvent | TouchEvent) => void;
    onSwatchHover?: (color: ColorState, event: MouseEvent) => void;
}
declare const ColorWrap: <P extends object>(Picker: ComponentType<P & ColorState & {
    onChange: any;
    onSwatchHover?: any;
}>) => React.FC<P & ColorWrapProps>;

interface AlphaProps {
    hsl: HSL;
    rgb: RGB;
    direction?: 'horizontal' | 'vertical';
    radius?: string | number;
    shadow?: string;
    onChange?: (color: any, e: React.MouseEvent | React.TouchEvent) => void;
    pointer?: FC<any>;
    renderers?: any;
    style?: {
        radius?: string | number;
        shadow?: string;
    };
    a?: number;
}
declare const Alpha: FC<AlphaProps>;

interface CheckboardProps {
    white?: string;
    grey?: string;
    size?: number;
    renderers?: {
        canvas?: any;
    };
    borderRadius?: string | number;
    boxShadow?: string;
    children?: ReactElement;
}
declare const Checkboard: FC<CheckboardProps>;

interface EditableInputProps {
    label?: string;
    value: string | number;
    onChange?: (value: any, e: any) => void;
    style?: {
        wrap?: React.CSSProperties;
        input?: React.CSSProperties;
        label?: React.CSSProperties;
    };
    placeholder?: string;
    dragLabel?: boolean;
    dragMax?: number;
    hideLabel?: boolean;
    arrowOffset?: number;
}
declare const EditableInput: FC<EditableInputProps>;

interface HueProps {
    hsl: HSL;
    direction?: 'horizontal' | 'vertical';
    radius?: string | number;
    shadow?: string;
    onChange?: (color: any, e: any) => void;
    pointer?: FC<any>;
    style?: {
        radius?: string | number;
        shadow?: string;
    };
}
declare const Hue: FC<HueProps>;

interface RaisedProps {
    zDepth?: 0 | 1 | 2 | 3 | 4 | 5;
    radius?: string | number;
    background?: string;
    children?: ReactNode;
    styles?: {
        wrap?: React.CSSProperties;
        content?: React.CSSProperties;
        bg?: React.CSSProperties;
    };
}
declare const Raised: FC<RaisedProps>;

interface SaturationProps {
    hsl: HSL;
    hsv: HSV;
    onChange?: (color: any, e: any) => void;
    pointer?: FC<any>;
    radius?: string | number;
    shadow?: string;
    style?: {
        color?: React.CSSProperties;
        white?: React.CSSProperties;
        black?: React.CSSProperties;
        pointer?: React.CSSProperties;
        circle?: React.CSSProperties;
        radius?: string | number;
        shadow?: string;
    };
}
declare const Saturation: FC<SaturationProps>;

interface SwatchProps {
    color: string;
    style?: React.CSSProperties;
    onClick?: (color: string, e: React.MouseEvent | React.KeyboardEvent) => void;
    onHover?: (color: string, e: React.MouseEvent) => void;
    title?: string;
    children?: ReactNode;
    focus?: boolean;
    focusStyle?: React.CSSProperties;
}
declare const _default: (props: SwatchProps) => react_jsx_runtime.JSX.Element;

export { Alpha, _default$e as AlphaPicker, type AlphaPickerProps, type AlphaProps, _default$d as BlockPicker, type BlockProps, Checkboard, type CheckboardProps, _default$b as ChromePicker, type ChromeProps, _default$c as CirclePicker, type CircleProps, type Color, type ColorState, type ColorWrapProps, _default$a as CompactPicker, type CompactProps, ColorWrap as CustomPicker, EditableInput, type EditableInputProps, _default$9 as GithubPicker, type GithubProps, _default$1 as GooglePicker, type GoogleProps, type HSL, type HSV, Hue, _default$8 as HuePicker, type HuePickerProps, type HueProps, _default$7 as MaterialPicker, type MaterialProps, _default$6 as PhotoshopPicker, type PhotoshopProps, type RGB, Raised, type RaisedProps, Saturation, type SaturationProps, _default$5 as SketchPicker, type SketchProps, _default$4 as SliderPicker, type SliderProps, _default as Swatch, type SwatchProps, _default$3 as SwatchesPicker, type SwatchesProps, _default$2 as TwitterPicker, type TwitterProps, _default$b as default };
