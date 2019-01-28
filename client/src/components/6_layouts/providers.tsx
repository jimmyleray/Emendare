import React from 'react'
import {
  DataProvider,
  NotificationsProvider,
  UserProvider,
  UserContext
} from '../../components'

// Return all providers encapsulated in order
export const Providers = ({ children }) => (
  <UserProvider>
    <UserContext.Consumer>
      {({ user }) => (
        <DataProvider user={user}>
          <NotificationsProvider user={user}>{children}</NotificationsProvider>
        </DataProvider>
      )}
    </UserContext.Consumer>
  </UserProvider>
)
