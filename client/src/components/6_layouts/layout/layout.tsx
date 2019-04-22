import React from 'react'
import {
  Navbar,
  Navtabs,
  Alerts,
  Card,
  Grid,
  ProfilCard,
  OtherLinksCard
} from '../../../components'

interface IProps {
  children: React.ReactNode
}

// Main Application layout
export const Layout = ({ children }: IProps) => (
  <React.Fragment>
    <header>
      <Navbar />
      <Navtabs />
      <Alerts />
    </header>
    <main>
      <div className="container">
        <Grid
          style={{
            gridTemplateColumns: '300px auto 300px',
            gridGap: '0 1rem'
          }}
        >
          <div className="is-hidden-mobile">
            <ProfilCard />
          </div>
          <div>{children}</div>
          <div className="is-hidden-mobile">
            <OtherLinksCard />
          </div>
        </Grid>
      </div>
    </main>
  </React.Fragment>
)
