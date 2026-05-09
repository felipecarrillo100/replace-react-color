
/**
 * A lightweight deep-merge utility for styling.
 * Used to preserve backwards compatibility for the legacy `styles` prop
 * while transitioning to standard inline React styles.
 * 
 * @param baseStyles The component's default inline styles
 * @param customStyles The user's legacy custom styles (e.g., props.styles.default)
 * @returns A merged object of React.CSSProperties
 */
export const mergeStyles = (
  baseStyles: Record<string, any>,
  customStyles?: Record<string, any>
): Record<string, any> => {
  if (!customStyles) return baseStyles

  // Issue deprecation warning in development
  if (process.env.NODE_ENV !== 'production') {
    // Use a tiny closure to ensure we only warn once per component instance to avoid spam
    if (!(window as any).__reactColorWarnedStyles) {
      console.warn(
        '[@replace-react-color] The `styles` prop is deprecated. ' +
        'Please use standard `style` and `className` props instead. ' +
        'This warning will only appear in development mode.'
      )
      ;(window as any).__reactColorWarnedStyles = true
    }
  }

  const merged = { ...baseStyles }

  for (const key in customStyles) {
    if (Object.prototype.hasOwnProperty.call(customStyles, key)) {
      merged[key] = {
        ...(merged[key] || {}),
        ...customStyles[key],
      }
    }
  }

  return merged
}
