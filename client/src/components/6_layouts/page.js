import React from 'react'
import { Footer, Navbar } from '../../components'

// Main Page layout that also update document title
export const Page = ({ children, title, className = '' }) => {
  document.title = title ? 'Emendare | ' + title : 'Emendare'

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 52px)'
      }}
    >
      <Navbar />
      <section className="section" style={{ flex: 1, padding: '1rem' }}>
        <div className={'container ' + className}>{children}</div>
      </section>
      <Footer />
    </main>
  )
}
