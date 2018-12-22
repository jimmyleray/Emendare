import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { UserContext } from '../contexts'

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <UserContext.Consumer>
      {({ isConnected }) => (
        <Route {...rest}>
          {isConnected() ? <Component /> : <Redirect to="/login" />}
        </Route>
      )}
    </UserContext.Consumer>
  )
}
