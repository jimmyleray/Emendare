import React from 'react'
import { Navbar, Alerts } from '../../../components'

interface IProps {
  children: React.ReactNode
}

// Main Application layout
export const Layout = ({ children }: IProps) => (
  <React.Fragment>
    <Navbar />
    <div style={{ paddingTop: '64px', paddingBottom: '50px' }}>
      <Alerts />
      <section className="section">
        <div className="container">
          <main>{children}</main>
        </div>
      </section>
    </div>
  </React.Fragment>
)
