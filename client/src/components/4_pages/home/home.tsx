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
    <Page title={translate('HOME')} style={{ padding: '0' }}>
      <Grid
        style={{
          gridTemplateColumns: '1fr 550px 1fr',
          gridGap: '0 0.5rem'
        }}
      >
        <div>
          <Card className="is-hidden-mobile">
            <ProfilCard />
          </Card>
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
