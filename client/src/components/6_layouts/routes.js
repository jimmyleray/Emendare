import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { PrivateRoute } from '../../components'
import * as Pages from '../4_pages'
import { routes } from '../../config'
import { capitalize } from 'lodash'

const routerConfig = Object.keys(routes)
  .map(key => ({ ...routes[key], component: capitalize(key) + 'Page' }))
  .map(route => {
    route.path = typeof route.path === 'function' ? route.path() : route.path
    route.component = Pages[route.component]
    return route
  })

export const Routes = () => (
  <Router>
    <Switch>
      {routerConfig.map(route => {
        const Component = route.private ? PrivateRoute : Route
        return <Component key={route.path} {...route} />
      })}
      <Route component={Pages.ErrorPage} />
    </Switch>
  </Router>
)
