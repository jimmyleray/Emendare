/*
 * Page d'inscription
 * Le but de cette page est de permettre aux utilisateurs :
 * - de s'inscire avec leur email / mot de passe
 * - d'accèder à la page de connexion
 */

import React from 'react'
import { SubscribeForm, Page, Hero, Buttons, Button } from '../../../components'
import { Socket } from '../../../services'
// Config
import { path } from '../../../config'

export const SubscribePage = () => (
  <Page title="Inscription">
    <Hero title="Créez votre compte" className="has-text-centered" />
    <SubscribeForm
      render={(
        email: string,
        password: string,
        checkPassword: string,
        pwdValid: boolean,
        pwdSame: boolean
      ) => {
        return (
          <Buttons>
            <Button
              type="submit"
              className="is-medium is-success is-fullwidth"
              disabled={!email || (!password && !pwdValid) || !pwdSame}
            >
              Inscription
            </Button>
            <Button to={path.login} className="is-fullwidth">
              J'ai déjà un compte
            </Button>
          </Buttons>
        )
      }}
    />
  </Page>
)
