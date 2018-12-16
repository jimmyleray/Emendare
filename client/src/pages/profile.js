import React from 'react'
import { Page } from '../components'
import { UserContext } from '../contexts'

export const Profile = () => (
  <Page title="Profil">
    <UserContext.Consumer>
      {({ user, logout }) => (
        <>
          <p>Profil de {user.email}</p>
          <p>Crée le {user.created}</p>
          <button onClick={logout} className="button is-danger">
            Se déconnecter
          </button>
        </>
      )}
    </UserContext.Consumer>
  </Page>
)
