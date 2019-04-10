import React from 'react'
import { News, Page, I18nContext, Grid, ProfilCard } from '../../../components'

export const HomePage = () => {
  const { translate } = React.useContext(I18nContext)

  return (
    <Page title={translate('HOME')} style={{ padding: '0' }}>
      <Grid
        style={{
          gridTemplateColumns: '1fr 550px 1fr',
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
