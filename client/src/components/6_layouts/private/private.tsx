import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { PendingPage, useUser } from '../../../components'
import { path } from '../../../config'

// Wait auto-connect to display private page or redirect to Login
export const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const { isConnected, isConnectionPending } = useUser()

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
              pathname: path.authentification,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}
