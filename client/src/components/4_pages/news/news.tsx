import React from 'react'
import { News, Page, I18nContext, Grid } from '../../../components'

export const NewsPage = () => {
  const { translate } = React.useContext(I18nContext)

  return (
    <Page title={translate('NEWS')} style={{ padding: '0' }}>
      <Grid style={{ gridTemplateColumns: '2fr 3.5fr 2fr' }}>
        <div />
        <News />
        <div />
      </Grid>
    </Page>
  )
}
