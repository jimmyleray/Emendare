import React from 'react'
import { Navbar } from '../../components'

// Main Page layout that also update document title
export const Page = ({ children, title, className = '' }) => {
  document.title = title ? 'Emendare | ' + title : 'Emendare'

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
