import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Home, Explore, Group, Login, Profile, Text } from '../pages'

export const routes = [
  { path: '/', component: Home, exact: true },
  { path: '/explore', component: Explore },
  { path: '/group', component: Group },
  { path: '/login', component: Login },
  { path: '/profile', component: Profile },
  { path: '/text', component: Text }
]

export const Routes = () => (
  <Router>
    <>
      {routes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          component={route.component}
          exact={route.exact}
        />
      ))}
    </>
  </Router>
)
