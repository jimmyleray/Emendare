import React from 'react'

interface IProps {
  type: string
  placeholder: string
  ariaLabel: string
  value?: any
  iconRight?: string
  iconLeft?: string
  onChange?: any
  disabled?: boolean
  id?: any
  name?: any
  className?: string
}

export const Input = ({
  className,
  iconRight,
  iconLeft,
  ariaLabel,
  ...rest
}: IProps) => {
  return (
    <React.Fragment>
      {iconLeft || iconRight ? (
        <div
          className={`control ${iconLeft && 'has-icons-left '} ${iconRight &&
            'has-icons-right '}`}
        >
          <input
            className={`input ${className}`}
            aria-label={ariaLabel}
            {...rest}
          />
          {iconLeft && (
            <span className="icon is-left">
              <i className={`fas ${iconLeft}`} />
            </span>
          )}
          {iconRight && (
            <span className="icon is-right">
              <i className={`fas ${iconRight}`} />
            </span>
          )}
        </div>
      ) : (
        <div className="control">
          <input
            className={`input ${className}`}
            aria-label={ariaLabel}
            {...rest}
          />
        </div>
      )}
    </React.Fragment>
  )
}
