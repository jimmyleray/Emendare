import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { UserContext } from '../contexts'
import { PendingPage } from '../pages'

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <UserContext.Consumer>
      {({ isConnected, isConnectionPending }) => (
        <Route
          {...rest}
          render={props =>
            isConnected() ? (
              <Component />
            ) : isConnectionPending ? (
              <PendingPage />
            ) : (
              <Redirect
                to={{ pathname: '/login', state: { from: props.location } }}
              />
            )
          }
        />
      )}
    </UserContext.Consumer>
  )
}
