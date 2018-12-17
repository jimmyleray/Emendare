import React from 'react'
import { Page } from '../components'
import { UserContext } from '../contexts'

export const ProfilePage = () => (
  <Page title="Profil">
    <UserContext.Consumer>
      {({ user, logout }) => (
        <>
          <p>Profil de {user.email}</p>
          <p>Crée le {new Date(user.created).toLocaleString()}</p>
          <button onClick={logout} className="button is-danger">
            Se déconnecter
          </button>
        </>
      )}
    </UserContext.Consumer>
  </Page>
)
