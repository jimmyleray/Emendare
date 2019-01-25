import React from 'react'
import { DataProvider, UserProvider } from '../../components'

const providers = [UserProvider, DataProvider]

// Return all providers encapsulated in order
export const Providers = ({ children }) =>
  providers.reduceRight(
    (children, Provider) => <Provider>{children}</Provider>,
    children
  )
