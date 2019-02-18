import React from 'react'
import {
  Icon,
  Notification,
  NotificationsContext,
  UserContext
} from '../../../components'

export const NotificationAlert = () => {
  const notificationsContext = React.useContext(NotificationsContext)
  const userContext = React.useContext(UserContext)

  return (
    <React.Fragment>
      {userContext.isConnected() &&
        notificationsContext.permission === 'default' && (
          <Notification
            className="is-info has-text-centered is-hidden-mobile"
            style={{ margin: 0, borderRadius: 0 }}
          >
            <div className="container is-fluid">
              <Icon type="fas fa-exclamation-circle" />
              Emendare a besoin de savoir si vous souhaitez{' '}
              <button
                style={{
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0,
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: 'inherit',
                  font: 'inherit'
                }}
                title="Demander l'autorisation d'activer les notifications"
                onClick={notificationsContext.requestPermission}
              >
                autoriser ou non les notifications
              </button>
            </div>
          </Notification>
        )}
    </React.Fragment>
  )
}
