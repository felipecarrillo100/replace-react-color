import React, { FC, ReactNode } from 'react'
import reactCSS from '../../reactcss'
import { merge } from '../../helpers/utils'

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
  const styles = reactCSS(merge({
    'default': {
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
        boxShadow: `0 ${zDepth}px ${zDepth * 4}px rgba(0,0,0,.24)`,
        borderRadius: radius,
        background,
      },
    },
    'zDepth-0': {
      bg: {
        boxShadow: 'none',
      },
    },
    'zDepth-1': {
      bg: {
        boxShadow: '0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16)',
      },
    },
    'zDepth-2': {
      bg: {
        boxShadow: '0 6px 20px rgba(0,0,0,.19), 0 8px 17px rgba(0,0,0,.2)',
      },
    },
    'zDepth-3': {
      bg: {
        boxShadow: '0 17px 50px rgba(0,0,0,.19), 0 12px 15px rgba(0,0,0,.24)',
      },
    },
    'zDepth-4': {
      bg: {
        boxShadow: '0 25px 55px rgba(0,0,0,.21), 0 16px 28px rgba(0,0,0,.22)',
      },
    },
    'zDepth-5': {
      bg: {
        boxShadow: '0 40px 77px rgba(0,0,0,.22), 0 27px 24px rgba(0,0,0,.2)',
      },
    },
  }, passedStyles), {
    [`zDepth-${zDepth}`]: true,
  })

  return (
    <div style={styles.wrap as React.CSSProperties}>
      <div style={styles.bg as React.CSSProperties} />
      <div style={styles.content as React.CSSProperties}>
        {children}
      </div>
    </div>
  )
}

export default Raised
