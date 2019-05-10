import React from 'react'
import {
  Logo,
  Link,
  UserContext,
  EventsContext,
  I18nContext,
  ApiContext
} from '../../../components'
import { path } from '../../../config'

export const Navbar = () => {
  const userContext = React.useContext(UserContext)
  const i18nContext = React.useContext(I18nContext)
  const { Socket } = React.useContext(ApiContext)

  const [burgerIsActive, setBurgerActive] = React.useState(false)
  const { hasNextPage } = React.useContext(EventsContext)

  React.useEffect(() => {
    if (userContext.user && hasNextPage) {
      Socket.emit('events')
    }
  }, [userContext.user])

  return (
    <nav
      className="navbar is-fixed-top is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link
            to={path.home}
            onClick={() => setBurgerActive(false)}
            className={'navbar-item has-text-weight-semibold'}
            style={{ textDecoration: 'none' }}
          >
            <Logo
              size={36}
              className="is-hidden-tablet"
              style={{ fill: 'white' }}
            />
            <Logo
              size={42}
              className="is-hidden-mobile"
              style={{ fill: 'white' }}
            />
            <span style={{ marginLeft: 8 }}>Emendare</span>
          </Link>
          <a
            role="button"
            onClick={() => setBurgerActive(!burgerIsActive)}
            className={
              'navbar-burger burger ' + (burgerIsActive ? 'is-active' : '')
            }
            aria-label="menu"
            aria-expanded={burgerIsActive}
            data-target="navbar-menu"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div
          id="navbar-menu"
          className={'navbar-menu ' + (burgerIsActive ? 'is-active' : '')}
        >
          <div className="navbar-end">
            <a
              href="#"
              role="button"
              className={`navbar-item ${
                i18nContext.actualLanguage === 'FR'
                  ? 'has-text-weight-bold'
                  : ''
              }`}
              onClick={() => {
                i18nContext.dispatch({
                  type: 'setLanguage',
                  payload: 'FR'
                })
              }}
            >
              FR
            </a>
            <a
              href="#"
              role="button"
              className={`
                navbar-item ${
                  i18nContext.actualLanguage === 'EN'
                    ? 'has-text-weight-bold'
                    : ''
                }`}
              onClick={() => {
                i18nContext.dispatch({
                  type: 'setLanguage',
                  payload: 'EN'
                })
              }}
            >
              EN
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
