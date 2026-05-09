import React, { FC, ReactNode } from 'react'

export interface PhotoshopButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  label?: string;
  children?: ReactNode;
  active?: boolean;
}

export const PhotoshopButton: FC<PhotoshopButtonProps> = ({ onClick, label, children, active }) => {
  const buttonStyle: React.CSSProperties = {
    backgroundImage: 'linear-gradient(-180deg, #FFFFFF 0%, #E6E6E6 100%)',
    border: '1px solid #878787',
    borderRadius: '2px',
    height: '20px',
    boxShadow: active ? '0 0 0 1px #878787' : '0 1px 0 0 #EAEAEA',
    fontSize: '14px',
    color: '#000',
    lineHeight: '20px',
    textAlign: 'center',
    marginBottom: '10px',
    cursor: 'pointer',
  }

  return (
    <div style={buttonStyle} onClick={onClick}>
      {label || children}
    </div>
  )
}

export default PhotoshopButton
