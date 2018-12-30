import React from 'react'
import { Button, Page } from '../../components'
import { path } from '../../config'

export const LegalPage = () => (
  <Page title="Mentions légales">
    <div className="field has-text-centered">
      <h1 className="is-size-3">Page en construction</h1>
      <h2 className="is-size-5">Contenu prochainement disponible</h2>
    </div>
    <div className="field is-grouped is-grouped-centered">
      <p className="control">
        <Button to={path.home} className="is-medium is-primary">
          Retour à l'accueil
        </Button>
      </p>
    </div>
  </Page>
)
