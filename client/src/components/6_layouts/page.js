import React from 'react'
import { Sidebar } from '../../components'

// Main Page layout that also update document title
export const Page = ({ children, title }) => {
  document.title = title ? 'Emendare | ' + title : 'Emendare'

  return (
    <div
      className="is-flex"
      style={{ flexDirection: 'row', minHeight: '100vh' }}
    >
      <Sidebar width="250px" />
      <div
        className="is-flex"
        style={{ flex: '1', flexDirection: 'column', width: '100%' }}
      >
        <main style={{ flex: 1, padding: '2rem' }}>{children}</main>
      </div>
    </div>
  )
}
