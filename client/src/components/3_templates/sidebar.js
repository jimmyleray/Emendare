import React from 'react'
import { Notification } from '../../components'

export const Sidebar = ({ width }) => (
  <div className="is-hidden-mobile" style={{ flex: 'none', width }}>
    <Notification
      className="is-dark"
      style={{ height: '100%', borderRadius: 0 }}
    >
      Textes suivis
    </Notification>
  </div>
)
