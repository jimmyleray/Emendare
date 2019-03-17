import React from 'react'
import { News, Page, I18nContext } from '../../../components'

export const NewsPage = () => {
  const { translate } = React.useContext(I18nContext)

  return (
    <Page title={translate('NEWS')}>
      <News />
    </Page>
  )
}
