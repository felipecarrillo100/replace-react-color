import React, { FC, ReactNode } from 'react'
import { mergeStyles } from '../../helpers/styles'

export interface RaisedProps {
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

export const Raised: FC<RaisedProps> = ({
  zDepth = 1,
  radius = 2,
  background = '#fff',
  children,
  styles: passedStyles = {}
}) => {
  const zDepthShadows = {
    0: 'none',
    1: '0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16)',
    2: '0 6px 20px rgba(0,0,0,.19), 0 8px 17px rgba(0,0,0,.2)',
    3: '0 17px 50px rgba(0,0,0,.19), 0 12px 15px rgba(0,0,0,.24)',
    4: '0 25px 55px rgba(0,0,0,.21), 0 16px 28px rgba(0,0,0,.22)',
    5: '0 40px 77px rgba(0,0,0,.22), 0 27px 24px rgba(0,0,0,.2)',
  }

  const baseStyles: Record<string, React.CSSProperties> = {
    wrap: {
      position: 'relative',
      display: 'inline-block',
    },
    content: {
      position: 'relative',
    },
    bg: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      boxShadow: zDepthShadows[zDepth] || `0 ${zDepth}px ${zDepth * 4}px rgba(0,0,0,.24)`,
      borderRadius: radius,
      background,
    },
  }

  const styles = mergeStyles(baseStyles, passedStyles)

  return (
    <div style={styles.wrap}>
      <div style={styles.bg} />
      <div style={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default Raised
