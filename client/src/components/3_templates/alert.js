import React from 'react'
import { Notification } from '../../components'

export const Alert = () => (
  <Notification
    className="is-warning has-text-centered"
    style={{ borderRadius: 0, margin: 0 }}
  >
    <p>
      <span className="has-text-weight-semibold">Version alpha</span> ouverte
      depuis le 7 Janvier 2019 uniquement pour les mails se terminant par{' '}
      <span className="has-text-weight-semibold">@zenika.com</span>
    </p>
    <p>
      Pour participer au développement, vous pouvez rejoindre le channel{' '}
      <span className="has-text-weight-semibold">#emendare</span> sur le slack
      Zenika
    </p>
  </Notification>
)
