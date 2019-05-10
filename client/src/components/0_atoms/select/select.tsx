import React from 'react'
// helpers
import { hasSelectedValueInOptions } from './helper'

interface ISelectProps {
  /** Options for the select */
  options: Array<{ value: string; label: string }>
  /** Selected value */
  selectedValue: string
  /** onChange function  */
  onChange: (event: any) => void
  /** Additional CSS UI class */
  className?: string
  /** style CSS */
  style?: React.CSSProperties
  /** Aria-label */
  ariaLabel?: string
}

export const Select = ({
  options,
  selectedValue,
  className = '',
  onChange,
  ...rest
}: ISelectProps) => {
  if (!hasSelectedValueInOptions(options, selectedValue)) {
    throw new Error('Options props are not containing the selectedValue')
  }
  return (
    <div className={`select ${className}`}>
      <select value={selectedValue} onChange={onChange} {...rest}>
        {options.map(
          (option: { label: string; value: string }, key: number) => (
            <option key={key.toString()} value={option.value}>
              {option.label}
            </option>
          )
        )}
      </select>
    </div>
  )
}
