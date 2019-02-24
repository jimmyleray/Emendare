/*
 * Page d'erreur introuvable
 * Le but de cette page est de permettre aux utilisateurs :
 * - de comprendre que la page demandée est introuvable
 * - d'accéder rapidement à la page d'acceuil
 */

import React from 'react'
import { Button, Hero, Page } from '../../../components'
import { path } from '../../../config'

const defaultError = {
  code: 404,
  message: "Oups, cette page n'existe pas ou plus"
}

export const ErrorPage = ({ error = defaultError }) => (
  <Page title="Erreur">
    <Hero title={'Erreur ' + error.code} subtitle={error.message} />
    <div>
      <Button to={path.home} className="has-text-weight-semibold is-primary">
        Retour à l'accueil
      </Button>
    </div>
  </Page>
)
