import React from 'react'
import { Hero, Page, I18nContext } from '../../../components'

export const LegalPage = () => {
  const { translate } = React.useContext(I18nContext)

  return (
    <Page title={translate('LEGAL_MENTIONS')}>
      <Hero
        title={translate('LEGAL_MENTIONS')}
        subtitle="Coordonnées de l'hébergeur"
      />
      <p>
        Emendare est hébergé par{' '}
        <a href="https://www.clever-cloud.com/en/legal-terms">Clever Cloud</a>
      </p>
    </Page>
  )
}
