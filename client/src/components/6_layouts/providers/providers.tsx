import React from 'react'
import {
  DataProvider,
  NotificationsProvider,
  SearchProvider,
  UserProvider
} from '../../../components'

interface IProps {
  children: React.ReactNode
}

const providers = [
  UserProvider,
  DataProvider,
  NotificationsProvider,
  SearchProvider
]

// Return all providers encapsulated in order
export const Providers = (props: IProps) =>
  providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    <React.Fragment>{props.children}</React.Fragment>
  )
