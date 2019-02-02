import React from 'react'
import { DataProvider, NotificationsProvider, UserProvider } from '..'

const providers = [UserProvider, DataProvider, NotificationsProvider]

// Return all providers encapsulated in order
export const Providers = ({ children }: { children: React.ReactNode }) =>
  providers.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    <>{children}</>
  )
