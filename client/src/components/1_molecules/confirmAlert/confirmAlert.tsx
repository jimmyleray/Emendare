import React from 'react'
import { Notification, Buttons, Button } from '../../../components'

interface IConfirmAlert {
  message: any
  onConfirm: any
  onCancel: any
  className?: string
}

export const ConfirmAlert = ({
  message,
  onConfirm,
  onCancel,
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
        >
          Confimer
        </Button>
      </Buttons>
    </div>
  </Notification>
)
