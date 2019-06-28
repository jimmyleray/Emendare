import React, { Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Layout, PrivateRoute, Providers } from '../../../components'
import PendingPage from '../../4_pages/pending/pending'
import ErrorPage from '../../4_pages/error/error'
import { routes } from '../../../config'
import isString from 'lodash/isString'

const getPage = (name: string) =>
  React.lazy(() => import(`../../4_pages/${name}/${name}`))

export const Router = () => (
  <BrowserRouter>
    <Providers>
      <Layout>
        <Suspense fallback={<PendingPage />}>
          <Switch>
            {routes.map(route => {
              // Resolve Default Path
              route.path = isString(route.path) ? route.path : route.path()

              // Then return the Route
              return route.private ? (
                <PrivateRoute key={route.path} {...route} />
              ) : (
                <Route
                  key={route.path}
                  exact={route.exact}
                  path={route.path}
                  component={getPage(route.name)}
                />
              )
            })}
            <Route component={ErrorPage} />
          </Switch>
        </Suspense>
      </Layout>
    </Providers>
  </BrowserRouter>
)
