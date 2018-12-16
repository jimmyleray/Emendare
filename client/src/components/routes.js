import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home, Explore, Group, Login, Profile, Text, NotFound } from '../pages'
import { PrivateRoute } from '../components'

export const routes = [
  { path: '/', component: Home, exact: true, public: true },
  { path: '/explore', component: Explore, public: true },
  { path: '/group', component: Group },
  { path: '/login', component: Login, public: true },
  { path: '/profile', component: Profile },
  { path: '/text', component: Text }
]

export const Routes = () => (
  <Router>
    <Switch>
      {routes.map((route, i) =>
        route.public ? (
          <Route key={i} {...route} />
        ) : (
          <PrivateRoute key={i} {...route} />
        )
      )}
      <Route component={NotFound} />
    </Switch>
  </Router>
)
