import React, { useState } from 'react'
import type { ColorResult, ColorState } from 'replace-react-color'
import {
  AlphaPicker,
  BlockPicker,
  ChromePicker,
  CirclePicker,
  CompactPicker,
  GithubPicker,
  GooglePicker,
  HuePicker,
  MaterialPicker,
  PhotoshopPicker,
  SketchPicker,
  SliderPicker,
  SwatchesPicker,
  TwitterPicker,
} from 'replace-react-color'

// ─── Types ───────────────────────────────────────────────────────────────────
interface PickerProps {
  label: string
  componentName: string
  color: ColorState
  onChange: (c: ColorResult) => void
  children: React.ReactNode
  snippet?: string
  fullWidth?: boolean
}

// ─── Reusable per-picker state hook ───────────────────────────────────────────
function usePickerColor(initial: any = '#2196F3') {
  const [color, setColor] = useState<any>(initial)
  const handleChange = (c: ColorResult) => setColor(c)
  
  const activeColor = color?.rgb ? `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})` : color
  
  return { color, activeColor, handleChange }
}

// ─── Color Preview Component ─────────────────────────────────────────────────
function ColorPreview({ colorState }: { colorState: any }) {
  const hex = typeof colorState === 'string' ? colorState : colorState?.hex || '#000000'
  const alpha = colorState?.rgb?.a !== undefined ? colorState.rgb.a : 1
  const rgba = colorState?.rgb ? `rgba(${colorState.rgb.r}, ${colorState.rgb.g}, ${colorState.rgb.b}, ${alpha})` : hex

  return (
    <div className="picker-preview">
      <div className="color-swatch-wrapper checkerboard">
        <div
          className="color-swatch-preview"
          style={{ background: rgba }}
        />
      </div>
      <div className="color-value-group">
        <span className="color-value">{hex.toUpperCase()}</span>
        <span className="color-alpha">Alpha: {Math.round(alpha * 100)}%</span>
      </div>
    </div>
  )
}

// ─── Code Snippet Component ──────────────────────────────────────────────────
function CodeSnippet({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-content">
      <button className="btn-copy" onClick={handleCopy}>
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre><code>{code}</code></pre>
    </div>
  )
}

// ─── Picker Card Component ───────────────────────────────────────────────────
function PickerCard({ label, componentName, color, children, snippet, fullWidth }: PickerProps) {
  const [showCode, setShowCode] = useState(false)

  const defaultSnippet = `import { ${componentName} } from 'replace-react-color';

const MyComponent = () => {
  const [color, setColor] = useState('${typeof color === 'string' ? color : color.hex}');

  return (
    <${componentName} 
      color={color} 
      onChange={(c) => setColor(c.hex)} 
    />
  );
};`

  return (
    <div className={`picker-card ${fullWidth ? 'full-width' : ''}`}>
      <div className="picker-card-header">
        <span className="picker-label">{label}</span>
        <button 
          className="code-toggle"
          onClick={() => setShowCode(!showCode)}
        >
          {showCode ? 'Hide Code' : 'View Code'}
        </button>
      </div>
      
      <div className="picker-body">
        {children}
      </div>

      <div className={`code-section ${showCode ? 'visible' : ''}`}>
        <CodeSnippet code={snippet || defaultSnippet} />
      </div>

      <div className="picker-footer">
        <ColorPreview colorState={color} />
      </div>
    </div>
  )
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const sketch = usePickerColor('#2196F3')
  const chrome = usePickerColor('#4CAF50')
  const twitter = usePickerColor('#03A9F4')
  const github = usePickerColor('#F44336')
  const compact = usePickerColor('#FF5722')
  const circle = usePickerColor('#E91E63')
  const material = usePickerColor('#607D8B')
  const block = usePickerColor('#795548')
  const swatches = usePickerColor('#3F51B5')
  const slider = usePickerColor('#009688')
  const hue = usePickerColor('#FF9800')
  const alpha = usePickerColor('rgba(103, 58, 183, 0.5)')
  const google = usePickerColor('#00BCD4')
  const photoshop = usePickerColor('#9C27B0')

  return (
    <>
      <header className="demo-header">
        <h1>
          replace-<span>react-color</span>
        </h1>
        <p>
          A high-performance, React 19 compatible drop-in replacement for the original react-color. 
          Featuring zero legacy dependencies and full TypeScript support.
        </p>
        <div className="demo-header-links">
          <a
            href="https://github.com/felipecarrillo100/replace-react-color"
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repository
          </a>
          <a
            href="https://casesandberg.github.io/react-color/"
            className="btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Original Docs ↗
          </a>
        </div>
      </header>

      <div className="demo-notice">
        <code>npm install replace-react-color</code> · Supports React 16.8+ to 19.0+
      </div>

      <main className="demo-main">
        <div className="demo-grid">
          <PickerCard 
            label="Sketch Picker" 
            componentName="SketchPicker"
            color={sketch.color} 
            onChange={sketch.handleChange}
          >
            <SketchPicker color={sketch.activeColor} onChange={sketch.handleChange} />
          </PickerCard>

          <PickerCard 
            label="Chrome Picker" 
            componentName="ChromePicker"
            color={chrome.color} 
            onChange={chrome.handleChange}
          >
            <ChromePicker color={chrome.activeColor} onChange={chrome.handleChange} />
          </PickerCard>

          <PickerCard 
            label="Github Picker" 
            componentName="GithubPicker"
            color={github.color} 
            onChange={github.handleChange}
          >
            <GithubPicker color={github.activeColor} onChange={github.handleChange} />
          </PickerCard>

          <PickerCard 
            label="Twitter Picker" 
            componentName="TwitterPicker"
            color={twitter.color} 
            onChange={twitter.handleChange}
          >
            <TwitterPicker color={twitter.activeColor} onChange={twitter.handleChange} />
          </PickerCard>

          <PickerCard 
            label="Compact Picker" 
            componentName="CompactPicker"
            color={compact.color} 
            onChange={compact.handleChange}
          >
            <CompactPicker color={compact.activeColor} onChange={compact.handleChange} />
          </PickerCard>

          <PickerCard 
            label="Circle Picker" 
            componentName="CirclePicker"
            color={circle.color} 
            onChange={circle.handleChange}
          >
            <CirclePicker color={circle.activeColor} onChange={circle.handleChange} />
          </PickerCard>

          <PickerCard 
            label="Material Picker" 
            componentName="MaterialPicker"
            color={material.color} 
            onChange={material.handleChange}
          >
            <MaterialPicker color={material.activeColor} onChange={material.handleChange} />
          </PickerCard>

          <PickerCard 
            label="Block Picker" 
            componentName="BlockPicker"
            color={block.color} 
            onChange={block.handleChange}
          >
            <BlockPicker color={block.activeColor} onChange={block.handleChange} />
          </PickerCard>

          <PickerCard 
            label="Swatches Picker" 
            componentName="SwatchesPicker"
            color={swatches.color} 
            onChange={swatches.handleChange}
          >
            <SwatchesPicker color={swatches.activeColor} onChange={swatches.handleChange} />
          </PickerCard>

          <PickerCard 
            label="Slider Picker" 
            componentName="SliderPicker"
            color={slider.color} 
            onChange={slider.handleChange}
          >
            <div style={{ width: '100%', maxWidth: 300 }}>
              <SliderPicker color={slider.activeColor} onChange={slider.handleChange} />
            </div>
          </PickerCard>

          <PickerCard 
            label="Hue Picker" 
            componentName="HuePicker"
            color={hue.color} 
            onChange={hue.handleChange}
          >
            <div style={{ width: '100%', maxWidth: 300, height: 16 }}>
              <HuePicker color={hue.activeColor} onChange={hue.handleChange} />
            </div>
          </PickerCard>

          <PickerCard 
            label="Alpha Picker" 
            componentName="AlphaPicker"
            color={alpha.color} 
            onChange={alpha.handleChange}
            snippet={`<AlphaPicker
  color={color}
  onChange={(c) => setColor(c.rgb)}
/>`}
          >
            <div style={{ width: '100%', maxWidth: 300, height: 16 }}>
              <AlphaPicker color={alpha.activeColor} onChange={alpha.handleChange} />
            </div>
          </PickerCard>

          {/* Wide pickers at the end for better grid balance */}
          <PickerCard 
            label="Google Picker" 
            componentName="GooglePicker"
            color={google.color} 
            onChange={google.handleChange}
            fullWidth={true}
          >
            <GooglePicker color={google.activeColor} onChange={google.handleChange} />
          </PickerCard>

          <PickerCard 
            label="Photoshop Picker" 
            componentName="PhotoshopPicker"
            color={photoshop.color} 
            onChange={photoshop.handleChange}
            fullWidth={true}
            snippet={`<PhotoshopPicker
  color={color}
  onChange={(c) => setColor(c.hex)}
  onAccept={() => console.log('Accepted')}
  onCancel={() => console.log('Cancelled')}
/>`}
          >
            <PhotoshopPicker
              color={photoshop.activeColor}
              onChange={photoshop.handleChange}
              onAccept={() => {}}
              onCancel={() => {}}
            />
          </PickerCard>
        </div>
      </main>

      <footer className="demo-footer">
        <p>
          replace-react-color · Licensed under MIT · 2026 Modern Component Series
        </p>
      </footer>
    </>
  )
}
