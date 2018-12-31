import React from 'react'
import { Page } from '../../components'

export const LegalPage = () => (
  <Page title="Mentions légales">
    <div className="field has-text-centered">
      <h1 className="is-size-3">Mentions légales</h1>
      <h2 className="is-size-5">Coordonnées de l'hébergeur</h2>
      <br />
      <p>
        Emendare est hebergé par{' '}
        <a href="https://www.clever-cloud.com/en/legal-terms">Clever Cloud</a>
      </p>
    </div>
  </Page>
)
