import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { UserContext } from '../contexts'

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <UserContext.Consumer>
      {({ user }) => (
        <Route
          {...rest}
          render={props =>
            user ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      )}
    </UserContext.Consumer>
  )
}
