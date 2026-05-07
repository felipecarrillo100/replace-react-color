import React, { FC, useState, useEffect, useRef, useCallback } from 'react'
import reactCSS from '../../reactcss'

const DEFAULT_ARROW_OFFSET = 1
const UP_KEY_CODE = 38
const DOWN_KEY_CODE = 40
const VALID_KEY_CODES = [UP_KEY_CODE, DOWN_KEY_CODE]

const isValidKeyCode = (keyCode: number) => VALID_KEY_CODES.indexOf(keyCode) > -1
const getNumberValue = (value: string) => Number(String(value).replace(/%/g, ''))

let idCounter = 1

export interface EditableInputProps {
  label?: string;
  value: string | number;
  onChange?: (value: any, e: any) => void;
  style?: {
    wrap?: React.CSSProperties;
    input?: React.CSSProperties;
    label?: React.CSSProperties;
  };
  placeholder?: string;
  dragLabel?: boolean;
  dragMax?: number;
  hideLabel?: boolean;
  arrowOffset?: number;
}

export const EditableInput: FC<EditableInputProps> = ({
  label,
  value: valueProp,
  onChange,
  style = {},
  placeholder,
  dragLabel,
  dragMax,
  hideLabel,
  arrowOffset
}) => {
  const [value, setValue] = useState(String(valueProp).toUpperCase())
  const [blurValue, setBlurValue] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useRef(`rc-editable-input-${idCounter++}`).current

  useEffect(() => {
    if (String(valueProp).toUpperCase() !== value) {
      if (inputRef.current === document.activeElement) {
        setBlurValue(String(valueProp).toUpperCase())
      } else {
        setValue(String(valueProp).toUpperCase())
        if (!blurValue) {
          setBlurValue(String(valueProp).toUpperCase())
        }
      }
    }
  }, [valueProp])

  const getValueObjectWithLabel = useCallback((val: string | number) => {
    return label ? { [label]: val } : val
  }, [label])

  const handleBlur = () => {
    if (blurValue) {
      setValue(blurValue)
      setBlurValue(null)
    }
  }

  const setUpdatedValue = useCallback((val: string | number, e: any) => {
    const onChangeValue = label ? getValueObjectWithLabel(val) : val
    onChange && onChange(onChangeValue, e)
    setValue(String(val))
  }, [label, onChange, getValueObjectWithLabel])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedValue(e.target.value, e)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const val = getNumberValue(e.currentTarget.value)
    if (!isNaN(val) && isValidKeyCode(e.keyCode)) {
      const offset = arrowOffset || DEFAULT_ARROW_OFFSET
      const updatedValue = e.keyCode === UP_KEY_CODE ? val + offset : val - offset
      setUpdatedValue(updatedValue, e)
    }
  }

  const handleDrag = useCallback((e: MouseEvent) => {
    if (dragLabel && typeof valueProp === 'number') {
      const newValue = Math.round(valueProp + e.movementX)
      if (newValue >= 0 && (dragMax === undefined || newValue <= dragMax)) {
        onChange && onChange(getValueObjectWithLabel(newValue), e)
      }
    }
  }, [dragLabel, valueProp, dragMax, onChange, getValueObjectWithLabel])

  const handleMouseUp = useCallback(() => {
    window.removeEventListener('mousemove', handleDrag)
    window.removeEventListener('mouseup', handleMouseUp)
  }, [handleDrag])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (dragLabel) {
      e.preventDefault()
      window.addEventListener('mousemove', handleDrag)
      window.addEventListener('mouseup', handleMouseUp)
    }
  }

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleDrag)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleDrag, handleMouseUp])

  const styles = reactCSS({
    'default': {
      wrap: {
        position: 'relative',
      },
      input: {
        ...style.input,
      },
      label: {
        ...style.label,
      },
    },
    'dragLabel-true': {
      label: {
        cursor: 'ew-resize',
      },
    },
    'user-override': {
      wrap: style.wrap || {},
    },
  }, {
    'dragLabel-true': !!dragLabel,
    'user-override': true,
  })

  return (
    <div style={styles.wrap as React.CSSProperties}>
      <input
        id={inputId}
        style={styles.input as React.CSSProperties}
        ref={inputRef}
        value={value}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        spellCheck="false"
      />
      {label && !hideLabel ? (
        <label
          htmlFor={inputId}
          style={styles.label as React.CSSProperties}
          onMouseDown={handleMouseDown}
        >
          {label}
        </label>
      ) : null}
    </div>
  )
}

export default EditableInput
