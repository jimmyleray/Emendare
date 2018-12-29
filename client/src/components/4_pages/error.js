/*
 * Page d'erreur introuvable
 * Le but de cette page est de permettre aux utilisateurs :
 * - de comprendre que la page demandée est introuvable
 * - d'accéder rapidement à la page d'acceuil
 */

import React from 'react'
import { Button, Page } from '../../components'

export const ErrorPage = () => (
  <Page title="Introuvable">
    <div className="field has-text-centered">
      <h1 className="is-size-3">Erreur 404 - Page introuvable</h1>
      <h2 className="is-size-5">Oups cette page n'existe pas ou plus</h2>
    </div>
    <div className="field is-grouped is-grouped-centered">
      <p className="control">
        <Button to="/" className="is-medium is-primary">
          Retour à l'accueil
        </Button>
      </p>
    </div>
  </Page>
)
