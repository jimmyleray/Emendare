import React from 'react'
import { News, Page, I18nContext, Grid, ProfilCard } from '../../../components'

export const NewsPage = () => {
  const { translate } = React.useContext(I18nContext)

  return (
    <Page title={translate('NEWS')} style={{ padding: '0' }}>
      <Grid
        style={{
          gridTemplateColumns: '300px 550px 1fr',
          paddingTop: '0.5rem',
          gridGap: '0.5rem'
        }}
      >
        <div className="is-hidden-mobile">
          <ProfilCard />
        </div>
        <div className="container-column">
          <News />
        </div>
        <div />
      </Grid>
    </Page>
  )
}
