import React from 'react'
import {
  DataProvider,
  NotificationsProvider,
  UserProvider,
  EventsProvider,
  I18nProvider
} from '../../../components'

interface IProps {
  children: React.ReactNode
}

const providers = [
  UserProvider,
  DataProvider,
  EventsProvider,
  NotificationsProvider,
  I18nProvider
]

// Return all providers encapsulated in order
export const Providers = ({ children }: IProps) =>
  providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    <React.Fragment>{children}</React.Fragment>
  )
