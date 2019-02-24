/* eslint-disable jsx-a11y/label-has-for */

import React from 'react'
import { Button, NotificationsContext, UserContext } from '../../../components'
import { Socket } from '../../../services'

const keys = ['newText', 'newAmend', 'amendAccepted', 'amendRefused']

const change = (key: string) => async () => {
  await Socket.fetch('toggleNotificationSetting', { key })
  Socket.emit('user')
}

const mapKeyToTitle = (key: string) => {
  switch (key) {
    case 'newText':
      return 'Nouveau texte'
    case 'newAmend':
      return 'Nouvel amendement'
    case 'amendAccepted':
      return 'Amendement accepté'
    case 'amendRefused':
      return 'Amendement refusé'
    default:
      return 'Clé invalide'
  }
}

export const NotificationSettings = () => {
  const notificationsContext = React.useContext(NotificationsContext)
  const userContext = React.useContext(UserContext)

  return (
    <React.Fragment>
      <p className="has-text-weight-semibold">Réglages des notifications</p>
      <br />
      {notificationsContext.permission === 'default' && (
        <React.Fragment>
          <div>
            <Button
              className="is-success"
              onClick={notificationsContext.requestPermission}
            >
              Activer les notifications
            </Button>
          </div>
          <br />
        </React.Fragment>
      )}
      {keys.map(key => (
        <div key={key} className="field">
          <input
            id={key}
            type="checkbox"
            name={key}
            className="switch is-rounded is-success"
            disabled={notificationsContext.permission !== 'granted'}
            checked={
              userContext.user
                ? ((userContext.user.notifications as any)[key] as boolean)
                : false
            }
            onChange={change(key)}
          />
          <label htmlFor={key}>{mapKeyToTitle(key)}</label>
        </div>
      ))}
    </React.Fragment>
  )
}
