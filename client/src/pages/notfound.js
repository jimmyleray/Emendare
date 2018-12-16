import React from 'react'
import { Link } from 'react-router-dom'
import { Page } from '../components'

export const NotFound = () => (
  <Page title="Introuvable">
    <div className="field has-text-centered">
      <h1 className="is-size-3">Erreur 404 - Page introuvable</h1>
      <h2 className="is-size-5">Oups cette page n'existe pas ou plus</h2>
    </div>
    <div className="field is-grouped is-grouped-centered">
      <p className="control">
        <Link to="/" className="button is-medium is-primary">
          Retour à l'accueil
        </Link>
      </p>
    </div>
  </Page>
)
