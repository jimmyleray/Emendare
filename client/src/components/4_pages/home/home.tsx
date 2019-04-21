import React from 'react'
import { News, Page, I18nContext, Grid, ProfilCard } from '../../../components'

export const HomePage = () => {
  const { translate } = React.useContext(I18nContext)

  return (
    <Page title={translate('HOME')} style={{ padding: 0 }}>
      <Grid
        style={{
          gridTemplateColumns: '350px auto 350px',
          gridGap: '0 1rem'
        }}
      >
        <div className="is-hidden-mobile">
          <ProfilCard />
        </div>
        <div>
          <News />
        </div>
      </Grid>
    </Page>
  )
}
