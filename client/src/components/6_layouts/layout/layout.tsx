import React, { useState } from 'react'
import { Header, NotificationAlert, Sidebar } from '../../../components'

interface IProps {
  children: React.ReactNode
}

// Main Application layout
export const Layout = (props: IProps) => {
  const [displaySidebarOnMobile, setSidebarDisplay] = useState(false)

  return (
    <div className="is-flex" style={{ flexDirection: 'column' }}>
      <NotificationAlert />
      <div
        className="is-flex"
        style={{ flex: '1', flexDirection: 'row', height: '100vh' }}
      >
        <Sidebar
          className={displaySidebarOnMobile ? '' : 'is-hidden-mobile'}
          style={{
            flex: 'none',
            width: '250px',
            maxHeight: '100vh',
            marginBottom: 0
          }}
        />
        <div
          className="is-flex"
          style={{
            flex: '1',
            flexDirection: 'column',
            width: '100%',
            height: '100vh'
          }}
        >
          <Header
            setSidebarDisplay={setSidebarDisplay}
            sidebarDisplayed={displaySidebarOnMobile}
          />
          <main
            style={{
              flex: 1,
              padding: '1.5rem',
              minHeight: 'calc(100vh - 70px)',
              overflow: 'auto'
            }}
            onClick={() => {
              setSidebarDisplay(false)
            }}
          >
            {props.children}
          </main>
        </div>
      </div>
    </div>
  )
}
