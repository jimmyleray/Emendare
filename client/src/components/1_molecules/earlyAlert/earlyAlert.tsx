import React from 'react'
import { Icon, Link, Notification, UserContext } from '../../../components'
import { path } from '../../../config'

export const EarlyAlert = () => {
  const userContext = React.useContext(UserContext)

  return (
    <React.Fragment>
      {!userContext.isConnected() && (
        <Notification
          className="is-info has-text-centered"
          style={{ margin: 0, borderRadius: 0 }}
        >
          <div className="container is-fluid">
            <Icon type="fas fa-exclamation-circle" />
            Emendare est actuellement en phase de test. N'hésitez pas à vous{' '}
            <Link to={path.subscribe}>inscrire</Link> pour suivre les nouveautés
          </div>
        </Notification>
      )}
    </React.Fragment>
  )
}
