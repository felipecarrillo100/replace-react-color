# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.1.4] - 2026-08-29

### Fixed

- Removed leftover `console.log` debug output from the `ColorWrap` higher-order component.
  Because `ColorWrap` wraps every picker, these logged on mount and again on every change
  event, flooding the consumer's console while dragging. `--minify` does not strip
  `console.*`, so they were shipping in the published bundle.

### Changed

- Added a `no-console` ESLint rule (`warn`, allowing `console.warn` / `console.error`) so
  stray debug logging is caught before release.

## [4.1.3] - 2026-05-15

### Fixed

- Missing content in the published npm package.

## [4.1.2] - 2026-05-10

### Fixed

- Restored the missing focused style.

## [4.1.1] - 2026-05-10

### Fixed

- Color parsing in the swatch pickers.

## [4.1.0] - 2026-05-09

### Changed

- Zero runtime dependencies: removed `tinycolor2` in favour of an internal color helper.

## [4.0.0] - 2026-05-09

### Changed

- **Breaking:** replaced `reactCSS` with native inline styles and modernized the component
  architecture.

## [3.0.1] - 2026-05-09

### Fixed

- Drag-handle behaviour and indicator alignment.

## [3.0.0] - 2026-05-07

- Initial release.
