/*
 * Page de connexion
 * Le but de cette page est de permettre aux utilisateurs :
 * - de se connecter avec leur email / mot de passe
 * - d'accèder à la page d'inscription
 * - TODO : d'accèder à une page de récupération de mot de passe
 */

import React from 'react'
import { Page, Hero, LoginForm, Buttons, Button } from '../../../components'
import { path } from '../../../config'

interface ILoginPageProps {
  location?: any
}

export const LoginPage = ({ location }: ILoginPageProps) => (
  <Page title="Connexion">
    <Hero title="Se connecter" className="has-text-centered" />
    <LoginForm
      location={location}
      render={(email: string, password: string) => (
        <Buttons>
          <Button
            type="submit"
            className="is-medium is-success is-fullwidth"
            disabled={!email || !password}
          >
            Connexion
          </Button>
          <Button to={path.subscribe} className="is-fullwidth">
            Je n'ai pas de compte
          </Button>
        </Buttons>
      )}
    />
  </Page>
)
