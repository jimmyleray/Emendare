import React from 'react'
import { Footer, Navbar, Sidebar } from '../../components'

const sidebarWidth = '250px'

// Main Page layout that also update document title
export const Page = ({ children, title, className = '' }) => {
  document.title = title ? 'Emendare | ' + title : 'Emendare'

  return (
    <>
      <Navbar />
      <div className="is-flex">
        <Sidebar width={sidebarWidth} />
        <div
          style={{ flex: 'initial', minWidth: `calc(100% - ${sidebarWidth})` }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: 'calc(100vh - 52px)',
              overflowY: 'auto'
            }}
          >
            <main style={{ flex: 1, padding: '2rem' }}>{children}</main>
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}
