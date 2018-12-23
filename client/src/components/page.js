import React from 'react'
import { Navbar } from '../components'

export const Page = ({ children, title, className = '' }) => {
  document.title = 'Emendare | ' + title

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <section className="section">
          <div className={'container ' + className}>{children}</div>
        </section>
      </main>
    </>
  )
}
