import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import * as Pages from '../pages'
import { PrivateRoute } from '../components'

export const routes = [
  { path: '/', component: Pages.HomePage, exact: true },
  { path: '/explore', component: Pages.ExplorePage },
  { path: '/group/:id', component: Pages.GroupPage },
  { path: '/login', component: Pages.LoginPage },
  { path: '/profile', component: Pages.ProfilePage, private: true },
  { path: '/text/:id', component: Pages.TextPage },
  { path: '/amend/:id', component: Pages.AmendPage, private: true }
]

export const Routes = () => (
  <Router>
    <Switch>
      {routes.map(route => {
        const Component = route.private ? PrivateRoute : Route
        return <Component key={route.path} {...route} />
      })}
      <Route component={Pages.NotFoundPage} />
    </Switch>
  </Router>
)
