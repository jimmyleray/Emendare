import React from 'react'
import { Button, Notification } from '../..'

interface IWarningAlertProps {
  /** Additional CSS UI class */
  className?: string
  /** onClick Event */
  onClick: any
  /** Message of the alert */
  message: any
}

export const WarningAlert = ({
  className,
  onClick,
  message
}: IWarningAlertProps) => (
  <Notification className={className} onClick={onClick}>
    <Button onClick={onClick} className={'delete ' + className} />
    {message}
  </Notification>
)
