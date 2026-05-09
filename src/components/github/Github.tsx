import React, { FC } from 'react'
import { mergeStyles } from '../../helpers/styles'
import { ColorWrap } from '../common'
import GithubSwatch from './GithubSwatch'

export interface GithubProps {
  width?: string | number;
  colors?: string[];
  onChange?: (color: any, e: any) => void;
  onSwatchHover?: (color: string, e: React.MouseEvent) => void;
  triangle?: 'hide' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  styles?: any;
  className?: string;
  style?: React.CSSProperties;
}

export const Github: FC<GithubProps> = ({
  width = 200,
  colors = ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB',
    '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB'],
  onChange,
  onSwatchHover,
  triangle = 'top-left',
  styles: passedStyles = {},
  className = '',
  style = {}
}) => {
  const baseStyles: Record<string, React.CSSProperties> = {
    card: {
      width,
      background: '#fff',
      border: '1px solid rgba(0,0,0,0.2)',
      boxShadow: '0 3px 12px rgba(0,0,0,0.15)',
      borderRadius: '4px',
      position: 'relative',
      padding: '5px',
      display: 'flex',
      flexWrap: 'wrap',
      ...style,
    },
    triangle: {
      position: 'absolute',
      border: '7px solid transparent',
      borderBottomColor: '#fff',
      display: triangle === 'hide' ? 'none' : 'block',
      ...(triangle === 'top-left' ? { top: '-14px', left: '10px' } : {}),
      ...(triangle === 'top-right' ? { top: '-14px', right: '10px' } : {}),
      ...(triangle === 'bottom-left' ? { top: '35px', left: '10px', transform: 'rotate(180deg)' } : {}),
      ...(triangle === 'bottom-right' ? { top: '35px', right: '10px', transform: 'rotate(180deg)' } : {}),
    },
    triangleShadow: {
      position: 'absolute',
      border: '8px solid transparent',
      borderBottomColor: 'rgba(0,0,0,0.15)',
      display: triangle === 'hide' ? 'none' : 'block',
      ...(triangle === 'top-left' ? { top: '-16px', left: '9px' } : {}),
      ...(triangle === 'top-right' ? { top: '-16px', right: '9px' } : {}),
      ...(triangle === 'bottom-left' ? { top: '37px', left: '9px', transform: 'rotate(180deg)' } : {}),
      ...(triangle === 'bottom-right' ? { top: '37px', right: '9px', transform: 'rotate(180deg)' } : {}),
    },
  }

  const styles = mergeStyles(baseStyles, passedStyles)

  const handleChange = (hex: string, e: any) => onChange && onChange({ hex, source: 'hex' }, e)

  return (
    <div style={styles.card} className={`github-picker ${className}`}>
      <div style={styles.triangleShadow} />
      <div style={styles.triangle} />
      {colors.map((c: string) => (
        <GithubSwatch
          color={c}
          key={c}
          onClick={handleChange}
          onSwatchHover={onSwatchHover}
        />
      ))}
    </div>
  )
}

export default ColorWrap(Github)
