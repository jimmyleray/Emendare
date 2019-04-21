import React from 'react'
import {
  Card,
  News,
  Page,
  I18nContext,
  Grid,
  ProfilCard
} from '../../../components'

export const HomePage = () => {
  const { translate } = React.useContext(I18nContext)

  return (
    <Page title={translate('HOME')} style={{ padding: 0 }}>
      <Grid
        style={{
          gridTemplateColumns: '350px 750px auto',
          gridGap: '0 1rem'
        }}
      >
        <div className="is-hidden-mobile">
          <ProfilCard />
        </div>
        <div>
          <Card>
            <News />
          </Card>
        </div>
      </Grid>
    </Page>
  )
}
