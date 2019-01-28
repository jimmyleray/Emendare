import React from 'react'
import { NotificationAlert, Sidebar } from '..'

// Main Application layout
export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="is-flex" style={{ flexDirection: 'column' }}>
      <NotificationAlert />
      <div
        className="is-flex"
        style={{ flex: '1', flexDirection: 'row', minHeight: '100vh' }}
      >
        <Sidebar width="250px" />
        <div
          className="is-flex"
          style={{ flex: '1', flexDirection: 'column', width: '100%' }}
        >
          <main style={{ flex: 1, padding: '2rem' }}>{children}</main>
        </div>
      </div>
    </div>
  )
}
