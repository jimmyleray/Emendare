import React from 'react'
import { Notification, NotificationsContext } from '..'

export const NotificationAlert = () => (
  <NotificationsContext.Consumer>
    {({ permission, request }) => (
      <>
        {permission === 'default' && (
          <Notification
            className="is-info has-text-centered is-hidden-mobile"
            style={{ margin: 0, borderRadius: 0 }}
          >
            <span className="has-text-weight-semibold">Emendare</span> a besoin
            de votre autorisation pour{' '}
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
              onClick={request}
            >
              activer les notifications de bureau
            </button>
            <br /> Vous pourrez ensuite les paramétrer plus finement sur votre
            page de profil
          </Notification>
        )}
      </>
    )}
  </NotificationsContext.Consumer>
)
