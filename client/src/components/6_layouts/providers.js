import React from 'react'
import { EventsProvider, UserProvider } from '../../components'

export const Providers = ({ children }) => (
  <EventsProvider>
    <UserProvider>{children}</UserProvider>
  </EventsProvider>
)
