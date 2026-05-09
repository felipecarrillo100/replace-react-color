import React, { FC, useState } from 'react'
import { Swatch } from '../common'

export interface GithubSwatchProps {
  color: string;
  onClick?: (color: string, e: any) => void;
  onSwatchHover?: (color: string, e: React.MouseEvent) => void;
}

export const GithubSwatch: FC<GithubSwatchProps> = ({ color, onClick, onSwatchHover }) => {
  const [hover, setHover] = useState(false)

  const hoverSwatch: React.CSSProperties = {
    position: 'relative',
    zIndex: 2,
    outline: '2px solid #fff',
    boxShadow: '0 0 5px 2px rgba(0,0,0,0.25)',
  }

  const swatchStyle: React.CSSProperties = {
    width: '25px',
    height: '25px',
    fontSize: '0',
    ...(hover ? hoverSwatch : {}),
  }

  return (
    <div
      style={swatchStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Swatch
        color={color}
        onClick={onClick}
        onHover={onSwatchHover}
        focusStyle={hoverSwatch}
      />
    </div>
  )
}

export default GithubSwatch
