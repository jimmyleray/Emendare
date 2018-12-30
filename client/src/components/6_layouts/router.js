import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { PrivateRoute } from '..'
import * as Pages from '../4_pages'
import { routes } from '../../config'
import { capitalize } from 'lodash'

export const Router = () => (
  <BrowserRouter>
    <Switch>
      {routes.map(route => {
        // Resolve Default Path
        route.path = typeof route.path === 'string' ? route.path : route.path()

        // Resolve Page Component
        route.component = Pages[capitalize(route.name) + 'Page']

        // Resolve Route Privacy
        const Component = route.private ? PrivateRoute : Route

        // Then return the Route
        return <Component key={route.path} {...route} />
      })}
      <Route component={Pages.ErrorPage} />
    </Switch>
  </BrowserRouter>
)
