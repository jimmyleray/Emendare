import React from 'react'
import { Notification, NotificationsContext } from '../../../components'

export const NotificationAlert = () => (
  <NotificationsContext.Consumer>
    {({ permission, requestPermission }) => (
      <>
        {permission === 'default' && (
          <Notification
            className="is-info has-text-centered is-hidden-mobile"
            style={{ margin: 0, borderRadius: 0 }}
          >
            <span className="has-text-weight-semibold">Emendare</span> a besoin
            de savoir si vous souhaitez{' '}
            <button
              className="has-text-weight-semibold"
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
              onClick={requestPermission}
            >
              autoriser ou non les notifications
            </button>
          </Notification>
        )}
      </>
    )}
  </NotificationsContext.Consumer>
)
