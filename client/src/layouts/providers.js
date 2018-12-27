import React from 'react'
import { EventsProvider, UserProvider } from '../contexts'

export const Providers = ({ children }) => (
  <EventsProvider>
    <UserProvider>{children}</UserProvider>
  </EventsProvider>
)
