import React, { useState } from 'react'
import type { ColorResult } from 'replace-react-color'
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

// ─── Reusable per-picker state hook ───────────────────────────────────────────
function usePickerColor(initial = '#2196F3') {
  const [color, setColor] = useState(initial)
  const handleChange = (c: ColorResult) => setColor(c.hex)
  return { color, handleChange }
}

// ─── Color swatch + hex preview ───────────────────────────────────────────────
function ColorPreview({ color }: { color: string }) {
  return (
    <div className="picker-preview">
      <div
        className="color-swatch-preview"
        style={{ background: color }}
        title={color}
      />
      <span className="color-value">{color.toUpperCase()}</span>
    </div>
  )
}

// ─── Wrapper for each picker section ─────────────────────────────────────────
function PickerCard({
  label,
  color,
  children,
}: {
  label: string
  color: string
  children: React.ReactNode
}) {
  return (
    <div className="picker-card">
      <div className="picker-label">{label}</div>
      {children}
      <ColorPreview color={color} />
    </div>
  )
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const sketch = usePickerColor('#2196F3')
  const chrome = usePickerColor('#4CAF50')
  const photoshop = usePickerColor('#9C27B0')
  const twitter = usePickerColor('#03A9F4')
  const github = usePickerColor('#F44336')
  const compact = usePickerColor('#FF5722')
  const circle = usePickerColor('#E91E63')
  const material = usePickerColor('#607D8B')
  const block = usePickerColor('#795548')
  const swatches = usePickerColor('#3F51B5')
  const slider = usePickerColor('#009688')
  const hue = usePickerColor('#FF9800')
  const alpha = usePickerColor('#673AB7')
  const google = usePickerColor('#00BCD4')

  return (
    <>
      {/* ── Header ── */}
      <header className="demo-header">
        <h1>
          replace-<span>react-color</span>
        </h1>
        <p>
          A modernized, React&nbsp;19 compatible drop-in replacement for{' '}
          <strong>react-color</strong>. All 13 pickers — fully interactive,
          fully typed.
        </p>
        <div className="demo-header-links">
          <a
            href="https://github.com/felipecarrillo100/replace-react-color"
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            ★ GitHub
          </a>
          <a
            href="https://felipecarrillo100.github.io/replace-react-color/"
            className="btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            API Docs
          </a>
          <a
            href="https://casesandberg.github.io/react-color/"
            className="btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Original react-color ↗
          </a>
        </div>
      </header>

      {/* ── Migration notice ── */}
      <div className="demo-notice">
        Drop-in replacement for{' '}
        <a
          href="https://www.npmjs.com/package/react-color"
          target="_blank"
          rel="noopener noreferrer"
        >
          react-color
        </a>{' '}
        · Works with React 16 → 19 · Zero legacy deps ·{' '}
        <code style={{ fontSize: 11 }}>
          npm install replace-react-color
        </code>
      </div>

      {/* ── Pickers grid ── */}
      <main className="demo-main">
        <h2 className="demo-section-title">All Color Pickers — Live &amp; Interactive</h2>

        <div className="demo-grid">
          {/* Sketch */}
          <PickerCard label="Sketch Picker" color={sketch.color}>
            <SketchPicker color={sketch.color} onChange={sketch.handleChange} />
          </PickerCard>

          {/* Chrome */}
          <PickerCard label="Chrome Picker" color={chrome.color}>
            <ChromePicker color={chrome.color} onChange={chrome.handleChange} />
          </PickerCard>

          {/* Photoshop */}
          <PickerCard label="Photoshop Picker" color={photoshop.color}>
            <PhotoshopPicker
              color={photoshop.color}
              onChange={photoshop.handleChange}
              onAccept={() => {}}
              onCancel={() => {}}
            />
          </PickerCard>

          {/* Twitter */}
          <PickerCard label="Twitter Picker" color={twitter.color}>
            <TwitterPicker
              color={twitter.color}
              onChange={twitter.handleChange}
            />
          </PickerCard>

          {/* Github */}
          <PickerCard label="Github Picker" color={github.color}>
            <GithubPicker
              color={github.color}
              onChange={github.handleChange}
            />
          </PickerCard>

          {/* Compact */}
          <PickerCard label="Compact Picker" color={compact.color}>
            <CompactPicker
              color={compact.color}
              onChange={compact.handleChange}
            />
          </PickerCard>

          {/* Circle */}
          <PickerCard label="Circle Picker" color={circle.color}>
            <CirclePicker
              color={circle.color}
              onChange={circle.handleChange}
            />
          </PickerCard>

          {/* Material */}
          <PickerCard label="Material Picker" color={material.color}>
            <MaterialPicker
              color={material.color}
              onChange={material.handleChange}
            />
          </PickerCard>

          {/* Block */}
          <PickerCard label="Block Picker" color={block.color}>
            <BlockPicker color={block.color} onChange={block.handleChange} />
          </PickerCard>

          {/* Google */}
          <PickerCard label="Google Picker" color={google.color}>
            <GooglePicker
              color={google.color}
              onChange={google.handleChange}
            />
          </PickerCard>

          {/* Swatches */}
          <PickerCard label="Swatches Picker" color={swatches.color}>
            <SwatchesPicker
              color={swatches.color}
              onChange={swatches.handleChange}
            />
          </PickerCard>

          {/* Slider */}
          <PickerCard label="Slider Picker" color={slider.color}>
            <div style={{ width: 300 }}>
              <SliderPicker
                color={slider.color}
                onChange={slider.handleChange}
              />
            </div>
          </PickerCard>

          {/* Hue */}
          <PickerCard label="Hue Picker" color={hue.color}>
            <div style={{ width: 300, height: 16 }}>
              <HuePicker
                color={hue.color}
                onChange={hue.handleChange}
              />
            </div>
          </PickerCard>

          {/* Alpha */}
          <PickerCard label="Alpha Picker" color={alpha.color}>
            <div style={{ width: 300, height: 16 }}>
              <AlphaPicker
                color={alpha.color}
                onChange={alpha.handleChange}
              />
            </div>
          </PickerCard>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="demo-footer">
        <p>
          Built with{' '}
          <a
            href="https://github.com/felipecarrillo100/replace-react-color"
            target="_blank"
            rel="noopener noreferrer"
          >
            replace-react-color
          </a>{' '}
          · Inspired by the original{' '}
          <a
            href="https://casesandberg.github.io/react-color/"
            target="_blank"
            rel="noopener noreferrer"
          >
            react-color demo
          </a>{' '}
          by Case Sandberg
        </p>
      </footer>
    </>
  )
}
