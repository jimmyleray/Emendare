import React from 'react'
import {
  DataProvider,
  NotificationsProvider,
  UserProvider
} from '../../../components'

interface IProps {
  children: React.ReactNode
}

const providers = [UserProvider, DataProvider, NotificationsProvider]

// Return all providers encapsulated in order
export const Providers = (props: IProps) =>
  providers.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    <React.Fragment>{props.children}</React.Fragment>
  )
