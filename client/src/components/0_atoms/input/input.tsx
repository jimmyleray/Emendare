import React from 'react'
import { Icon } from '../../../components'

interface IProps {
  /** Type of the input */
  type: string
  /** Placeholder of the input */
  placeholder: string
  /** aria-label of the input */
  ariaLabel: string
  /** Set a value to the input */
  value?: any
  /** icon font name to put it in the right of the input */
  iconRight?: string
  /** icon font name to put it in the right of the input */
  iconLeft?: string
  /** onChange event */
  onChange?: any
  /** Possibility to disable the input */
  disabled?: boolean
  /** Id of the input */
  id?: any
  /** Name of the input */
  name?: any
  /** Additional CSS UI class */
  className?: string
  /** Autocomplete the input */
  autoComplete?: string
  /** Auto focus the input */
  autoFocus?: boolean
}

export const Input = React.memo(
  ({ className, iconRight, iconLeft, ariaLabel, ...rest }: IProps) => {
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
            {iconLeft && <Icon name={iconLeft} className="is-medium is-left" />}
            {iconRight && (
              <Icon name={iconRight} className="is-medium is-right" />
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
)
