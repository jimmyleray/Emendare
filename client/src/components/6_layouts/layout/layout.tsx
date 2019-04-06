import React from 'react'
import { Navbar, Alerts, Footer } from '../../../components'

interface IProps {
  children: React.ReactNode
}

// Main Application layout
export const Layout = ({ children }: IProps) => (
  <React.Fragment>
    <header>
      <Navbar />
      <Alerts />
    </header>
    <main>
      <section className="section">
        <div className="container">
          <main>{children}</main>
        </div>
      </section>
    </main>
    <footer className="is-hidden-tablet">
      <Footer />
    </footer>
  </React.Fragment>
)
