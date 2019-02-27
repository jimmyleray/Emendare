import React from 'react'
import { Notification, Buttons, Button } from '../../../components'

interface IConfirmAlert {
  /** The message you want to display */
  message: any
  /** Action to do when the user accept */
  onConfirm: any
  /** Action to do when the user decline */
  onCancel: any
  /** Disable the confirm button */
  disabled?: boolean
  /** Additional CSS UI class */
  className?: string
}

export const ConfirmAlert = ({
  message,
  onConfirm,
  onCancel,
  disabled,
  className
}: IConfirmAlert) => (
  <Notification className={className}>
    {message}
    <div
      style={{ marginTop: '1rem' }}
      className="field is-grouped is-grouped-right"
    >
      <Buttons>
        <Button
          onClick={onCancel}
          className={'button is-inverted is-outlined ' + className}
        >
          Annuler
        </Button>
        <Button
          onClick={onConfirm}
          className={'button is-inverted  ' + className}
          disabled={disabled}
        >
          Confimer
        </Button>
      </Buttons>
    </div>
  </Notification>
)
