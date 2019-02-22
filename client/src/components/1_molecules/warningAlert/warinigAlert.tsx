import React from 'react'
import { Button, Notification } from '../../../components'

interface IWarningAlertProps {
  className?: string
  onClick: any
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
