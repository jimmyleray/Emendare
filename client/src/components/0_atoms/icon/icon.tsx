import React from 'react'

interface IProps {
  /** Type of the icon */
  type?: 'solid' | 'regular' | 'light' | 'brands'
  /** Additional CSS UI class */
  size?: string
  /** Name of the icon */
  name: string
  /** Additional CSS UI class */
  className?: string
  /** Title to display when onHover */
  title?: string
  /** Style CSS */
  style?: React.CSSProperties
}

export const Icon = React.memo(
  ({ type, size = '', name, className = '', ...rest }: IProps) => {
    let nameWithType = name
    switch (type) {
      case 'solid':
        nameWithType = nameWithType + ' fas'
        break
      case 'regular':
        nameWithType = nameWithType + ' far'
        break
      case 'light':
        nameWithType = nameWithType + ' fal'
        break
      case 'brands':
        nameWithType = nameWithType + ' fab'
        break
      default:
        nameWithType = nameWithType + ' fal'
        break
    }

    return (
      <span className={'icon ' + className} {...rest}>
        <i className={nameWithType + ' ' + size} />
      </span>
    )
  }
)
