import React from 'react'
import { Hero, Page, I18nContext } from '../../../components'

export const HomePage = () => {
  const { translate } = React.useContext(I18nContext)

  return (
    <Page title={translate('HOME')}>
      <Hero
        title={translate('HOME_TITLE')}
        subtitle={translate('HOME_SUBTITLE')}
        className="has-text-centered"
      />
    </Page>
  )
}
