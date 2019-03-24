import React from 'react'

interface IProps {
  /** Type of the icon */
  type?: 'solid' | 'regular' | 'light' | 'brands'
  /** Name of the icon */
  name: string
  /** Additional CSS UI class */
  className?: string
  /** Title to display when onHover */
  title?: string
}

export const Icon = React.memo(({ type, name, className, ...rest }: IProps) => {
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
      <i className={nameWithType} />
    </span>
  )
})
