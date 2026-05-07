import { ComponentType, useState } from 'react'

export const handleFocus = <P extends object>(
  Component: ComponentType<P & { focus: boolean }>,
  Span: any = 'span'
) => {
  return function Focus(props: P) {
    const [focus, setFocus] = useState(false)
    const handleFocus = () => setFocus(true)
    const handleBlur = () => setFocus(false)

    const SpanElement = Span as any

    return (
      <SpanElement onFocus={handleFocus} onBlur={handleBlur}>
        <Component {...props} focus={focus} />
      </SpanElement>
    )
  }
}
