import React from 'react'
import { EventsProvider, UserProvider } from '../../components'

const providers = [EventsProvider, UserProvider]

// Return all providers encapsulated in order
export const Providers = ({ children }) =>
  providers.reduceRight(
    (children, Provider) => <Provider>{children}</Provider>,
    children
  )
