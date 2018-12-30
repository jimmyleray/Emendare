import React from 'react'
import { EventsProvider, UserProvider } from '../../components'

const providers = [EventsProvider, UserProvider]

export const Providers = ({ children }) =>
  providers.reduceRight(
    (children, Provider) => <Provider>{children}</Provider>,
    children
  )
