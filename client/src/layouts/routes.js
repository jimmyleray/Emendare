import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { PrivateRoute } from '../layouts'
import * as Pages from '../pages'

export const routes = [
  { path: '/', component: Pages.HomePage, exact: true },
  { path: '/actualites', component: Pages.NewsPage },
  { path: '/explorer', component: Pages.ExplorePage },
  { path: '/groupe/:id', component: Pages.GroupPage },
  { path: '/connexion', component: Pages.LoginPage },
  { path: '/profil', component: Pages.ProfilePage, private: true },
  { path: '/texte/:id', component: Pages.TextPage },
  {
    path: '/editer/:id',
    component: Pages.EditPage,
    private: true
  },
  {
    path: '/amendement/:id',
    component: Pages.AmendPage
  }
]

export const Routes = () => (
  <Router>
    <Switch>
      {routes.map(route => {
        const Component = route.private ? PrivateRoute : Route
        return <Component key={route.path} {...route} />
      })}
      <Route component={Pages.ErrorPage} />
    </Switch>
  </Router>
)
