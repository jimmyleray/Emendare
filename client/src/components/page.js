import React from 'react'
import { Navbar } from '../components'

export const Page = ({ children, title }) => {
  document.title = 'Emendare | ' + title

  return (
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
}
