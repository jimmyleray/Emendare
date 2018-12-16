import React from 'react'
import { Navbar } from '../components'

export const Page = ({ children }) => (
  <>
    <header>
      <Navbar />
    </header>
    <main>
      <section className="section">
        <div className="container">{children}</div>
      </section>
    </main>
  </>
)
