import React, { FC, ReactNode } from 'react'
import { handleFocus } from '../../helpers/interaction'
import Checkboard from './Checkboard'

const ENTER = 13

export interface SwatchProps {
  color: string;
  style?: React.CSSProperties;
  onClick?: (color: string, e: React.MouseEvent | React.KeyboardEvent) => void;
  onHover?: (color: string, e: React.MouseEvent) => void;
  title?: string;
  children?: ReactNode;
  focus?: boolean;
  focusStyle?: React.CSSProperties;
}

const SwatchBase: FC<SwatchProps> = ({
  color,
  style,
  onClick = () => {},
  onHover,
  title = color,
  children,
  focus,
  focusStyle = {}
}) => {
  const transparent = color === 'transparent'
  const swatchStyle: React.CSSProperties = {
    background: color,
    height: '100%',
    width: '100%',
    cursor: 'pointer',
    position: 'relative',
    outline: 'none',
    ...style,
    ...(focus ? focusStyle : {}),
  }

  const handleClick = (e: React.MouseEvent) => onClick(color, e)
  const handleKeyDown = (e: React.KeyboardEvent) => e.keyCode === ENTER && onClick(color, e)
  const handleHover = (e: React.MouseEvent) => onHover && onHover(color, e)

  const optionalEvents: any = {}
  if (onHover) {
    optionalEvents.onMouseOver = handleHover
  }

  return (
    <div
      style={swatchStyle}
      onClick={handleClick}
      title={title}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      {...optionalEvents}
    >
      {children}
      {transparent && (
        <Checkboard
          borderRadius={swatchStyle.borderRadius}
          boxShadow="inset 0 0 0 1px rgba(0,0,0,0.1)"
        />
      )}
    </div>
  )
}

export const Swatch = handleFocus(SwatchBase)
export default Swatch
