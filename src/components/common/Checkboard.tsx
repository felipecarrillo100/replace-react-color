import React, { isValidElement, FC, ReactElement } from 'react'
import * as checkboard from '../../helpers/checkboard'

export interface CheckboardProps {
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

export const Checkboard: FC<CheckboardProps> = ({
  white = 'transparent',
  grey = 'rgba(0,0,0,.08)',
  size = 8,
  renderers = {},
  borderRadius,
  boxShadow,
  children
}) => {
  const gridStyle: React.CSSProperties = {
    borderRadius,
    boxShadow,
    position: 'absolute',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    background: `url(${checkboard.get(white, grey, size, renderers.canvas)}) center left`,
  }

  if (isValidElement(children)) {
    const child = children as ReactElement<any>
    return React.cloneElement(child, {
      ...child.props,
      style: { ...child.props.style, ...gridStyle }
    })
  }

  return <div style={gridStyle} />
}

export default Checkboard
