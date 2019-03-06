import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { PendingPage, UserContext } from '../../../components'
import { path } from '../../../config'

// Wait auto-connect to display private page or redirect to Login
export const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const { isConnected, isConnectionPending } = useContext(UserContext)

  return (
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
  )
}
