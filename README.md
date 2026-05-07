# replace-react-color

A modernized, lightweight, and dependency-free TypeScript fork of the highly popular legacy `react-color` library. 

This repository brings the classic color pickers (Sketch, Photoshop, Chrome, etc.) into the modern era, fully compatible with **React 19**, while completely eliminating legacy bloat and ensuring long-term maintainability.

> 📚 **[View the API Documentation](https://fcarrill.github.io/replace-react-color/)**

![Demo](https://media.giphy.com/media/26FfggT53qE304CwE/giphy.gif)

## 🏆 Acknowledgements & Credits

* **Modernization & Refactor**: Spearheaded by **felipecarrillo100**, who completely overhauled the codebase to modern standards, purged legacy dependencies, implemented native TypeScript utilities, and modernized the build infrastructure to Vite/esbuild.
* **Original Author**: The original `react-color` library was brilliantly designed and created by **Case Sandberg** (@casesandberg). All credit for the iconic UI designs, component structures, and the original `reactCSS` paradigm goes to him. 

---

## 🧠 Rationale for the Rewrite

The original `react-color` library was a staple in the React ecosystem but suffered from significant bit-rot:
1. **Dependency Bloat**: It relied heavily on outdated utilities like `lodash`, `lodash-es`, `material-colors`, and `@icons/material`.
2. **React 15/16 Legacy**: The codebase was written using outdated React Class components, legacy lifecycle methods, and Enzyme testing paradigms, breaking entirely on React 18 and 19.
3. **`reactcss` Abandonment**: The underlying styling engine (`reactcss`) was unmaintained, throwing numerous deprecation warnings and failing in modern strict-mode environments.
4. **TypeScript Deficiencies**: It lacked native TypeScript support, relying on clunky third-party `@types` that were frequently out of sync.

### What We Fixed:
- **Reduced Dependencies**: Eliminated `lodash`, `material-colors`, and external icon libraries.
- **Inlined Assets**: SVGs and standard material color palettes are now natively built-in.
- **Vendored Styling**: Completely vendored and converted the `reactcss` engine into pure TypeScript, keeping the original styling paradigm intact but modernizing its execution.
- **Hooks & Functional Components**: Completely rewrote the core library to use modern React Hooks (`useState`, `useEffect`, `useCallback`), ensuring 100% compatibility with React 19 and Strict Mode.
- **ESM/CJS Support**: Modernized the build pipeline using `tsup` to seamlessly output highly optimized ESM and CommonJS bundles.

---

## 🚀 Migration Plan (For Existing Users)

Migrating from the legacy `react-color` to this modernized fork is designed to be a **seamless, drop-in replacement**. We went to great lengths to preserve the exact same API surface area while ripping out the legacy internals.

### 1. Update Dependencies
Remove the old library and install the new modernized package:
```bash
# Remove the old package and its types
npm uninstall react-color @types/react-color

# Install the modernized version (update with the published package name)
npm install replace-react-color
```

### 2. Update Imports
Because the API surface has been perfectly preserved, you only need to change your import paths if the package name changes. All components function exactly as they did before.
```tsx
// OLD
import { SketchPicker } from 'react-color'

// NEW
import { SketchPicker } from 'replace-react-color'
```

### 3. Enjoy React 19 Compatibility
You no longer need to use `--legacy-peer-deps` or worry about your console flooding with `componentWillReceiveProps` deprecation warnings. You can now safely upgrade your application to React 18 or React 19!

---

## 📖 Installation & Usage

### Basic Example
```tsx
import React, { useState } from 'react'
import { SketchPicker } from 'replace-react-color'

export const Component = () => {
  const [color, setColor] = useState('#fff')

  return (
    <SketchPicker 
      color={color} 
      onChangeComplete={(newColor) => setColor(newColor.hex)} 
    />
  )
}
```

You can import `AlphaPicker`, `BlockPicker`, `ChromePicker`, `CirclePicker`, `CompactPicker`, `GithubPicker`, `HuePicker`, `MaterialPicker`, `PhotoshopPicker`, `SketchPicker`, `SliderPicker`, `SwatchesPicker`, and `TwitterPicker` respectively.
