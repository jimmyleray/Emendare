import React from 'react'
import { Navbar, Alerts } from '../../../components'

interface IProps {
  children: React.ReactNode
}

// Main Application layout
export const Layout = (props: IProps) => (
  <div
    className="is-flex"
    style={{ flex: '1', flexDirection: 'column', height: '100vh' }}
  >
    <Alerts />
    <Navbar />
    <div style={{ flex: 1, overflow: 'auto' }}>
      <div className="container">
        <main style={{ padding: '2rem' }}>{props.children}</main>
      </div>
    </div>
  </div>
)
