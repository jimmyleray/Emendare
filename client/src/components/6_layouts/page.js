import React from 'react'
import { Navbar, Sidebar } from '../../components'

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
          <main style={{ minHeight: 'calc(100vh - 52px)', padding: '2rem' }}>
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
