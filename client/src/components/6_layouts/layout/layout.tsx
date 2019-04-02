import React from 'react'
import { Navbar, Alerts, Footer } from '../../../components'

interface IProps {
  children: React.ReactNode
}

// Main Application layout
export const Layout = ({ children }: IProps) => (
  <div className="is-flex" style={{ flexDirection: 'column', height: '100vh' }}>
    <Navbar />
    <div style={{ flex: 1 }}>
      <Alerts />
      <section className="section">
        <div className="container">
          <main>{children}</main>
        </div>
      </section>
    </div>
    <Footer className="is-hidden-tablet" />
  </div>
)
