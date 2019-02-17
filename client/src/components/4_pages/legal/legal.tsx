import React from 'react'
import { Hero, Page } from '../../../components'

export const LegalPage = () => (
  <Page title="Mentions légales">
    <Hero title="Mentions légales" subtitle="Coordonnées de l'hébergeur" />
    <p>
      Emendare est hébergé par{' '}
      <a href="https://www.clever-cloud.com/en/legal-terms">Clever Cloud</a>
    </p>
  </Page>
)
