import React from 'react'
import { Navbar, Alerts } from '../../../components'

interface IProps {
  children: React.ReactNode
}

// Main Application layout
export const Layout = (props: IProps) => (
  <div
    className="is-flex"
    style={{
      flex: '1',
      flexDirection: 'column',
      height: '100vh'
    }}
  >
    <Alerts />
    <Navbar />
    <section
      tabIndex={-1}
      id="main-content"
      className="section"
      style={{ flex: 1, overflowY: 'scroll', outline: 0 }}
    >
      <div className="container">
        <main style={{ paddingBottom: '50px' }}>{props.children}</main>
      </div>
    </section>
  </div>
)
