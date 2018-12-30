import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { PendingPage, UserContext } from '../../components'
import { path } from '../../config'

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <UserContext.Consumer>
    {({ isConnected, isConnectionPending }) => (
      <Route
        {...rest}
        render={props =>
          isConnected() ? (
            <Component {...props} />
          ) : isConnectionPending ? (
            <PendingPage />
          ) : (
            <Redirect
              to={{
                pathname: path.login,
                state: { from: props.location }
              }}
            />
          )
        }
      />
    )}
  </UserContext.Consumer>
)
