import React from 'react'
import {
  DataProvider,
  NotificationsProvider,
  UserProvider,
  EventsProvider,
  I18nProvider,
  ApiProvider
} from '../../../components'

interface IProps {
  children: React.ReactNode
}

const providers = [
  NotificationsProvider,
  I18nProvider,
  ApiProvider,
  UserProvider,
  DataProvider,
  EventsProvider
]

// Return all providers encapsulated in order
export const Providers = ({ children }: IProps) =>
  providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    <React.Fragment>{children}</React.Fragment>
  )
