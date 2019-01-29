import React from 'react'
import { Icon, Link, Logo, Notification } from '..'
import { path } from '../../config'

export const Header = ({ setSidebarDisplay, sidebarDisplayed }: any) => (
  <Notification
    className="is-dark is-hidden-tablet"
    style={{
      borderRadius: 0,
      display: 'flex',
      flexDirection: 'row',
      height: '70px',
      marginBottom: 0,
      padding: '12px',
      overflow: 'hidden'
    }}
  >
    <div
      onClick={() => {
        setSidebarDisplay(!sidebarDisplayed)
      }}
    >
      <Icon
        type={'fas ' + (sidebarDisplayed ? 'fa-times' : 'fa-bars')}
        className="fa-2x is-large"
      />
    </div>
    <div
      className="has-text-centered"
      style={{ flex: 1 }}
      onClick={() => {
        setSidebarDisplay(false)
      }}
    >
      <Link
        to={path.home}
        className="has-text-weight-semibold is-size-4"
        style={{ textDecoration: 'none' }}
      >
        <Logo />
        <span style={{ marginLeft: '6px' }}>Emendare</span>
      </Link>
    </div>
    <Link to={path.profile}>
      <Icon type="fas fa-user" className="fa-2x is-large" />
    </Link>
  </Notification>
)
