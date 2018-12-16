import React from 'react'
import { UserProvider } from '../contexts'

export const Providers = ({ children }) => (
  <UserProvider>{children}</UserProvider>
)
