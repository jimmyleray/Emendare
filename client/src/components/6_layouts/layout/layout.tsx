import React from 'react'
import { Navbar, Alerts, Footer } from '../../../components'

interface IProps {
  children: React.ReactNode
}

// Main Application layout
export const Layout = ({ children }: IProps) => (
  <div className="is-flex" style={{ flexDirection: 'column', height: '100vh' }}>
    <header>
      <Navbar />
    </header>
    <main style={{ flex: 1 }}>
      <Alerts />
      <section className="section">
        <div className="container">
          <main>{children}</main>
        </div>
      </section>
    </main>
    <footer>
      <Footer className="is-hidden-tablet" />
    </footer>
  </div>
)
