import React from 'react'
import { Explore, Page, I18nContext } from '../../../components'

export const ExplorePage = () => {
  const { translate } = React.useContext(I18nContext)

  return (
    <Page title={translate('EXPLORE')}>
      <Explore />
    </Page>
  )
}
