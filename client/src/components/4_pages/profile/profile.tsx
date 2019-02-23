/*
 * Page de profil
 * Le but de cette page est de permettre aux utilisateurs :
 * - de visualiser les informations liées à son compte
 * - de supprimer leur compte et leurs données
 * - de changer d'email
 * - de changer de mot de passe
 * - de paramétrer les détails de son compte
 */

import React from 'react'
import {
  Button,
  Column,
  Columns,
  Page,
  NotificationSettings,
  UserCredentials,
  UserContext,
  Hero
} from '../../../components'

export const ProfilePage = () => (
  <Page title="Profil">
    <UserContext.Consumer>
      {({ user, logout }: any) =>
        user && (
          <React.Fragment>
            <Hero title="Mon profil" subtitle={user.email} />
            <div>
              <Button onClick={logout} className="is-danger is-medium">
                Se déconnecter
              </Button>
            </div>
            <br />
            <Columns>
              <Column>
                <NotificationSettings user={user} />
              </Column>
              <Column>
                <UserCredentials />
              </Column>
            </Columns>
          </React.Fragment>
        )
      }
    </UserContext.Consumer>
  </Page>
)
