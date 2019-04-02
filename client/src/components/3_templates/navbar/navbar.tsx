import React from 'react'
import {
  Logo,
  Divider,
  Link,
  UserContext,
  EventsContext,
  I18nContext,
  DropDown
} from '../../../components'
import { path } from '../../../config'
import { Socket, Title } from '../../../services'

export const Navbar = () => {
  const userContext = React.useContext(UserContext)
  const i18nContext = React.useContext(I18nContext)
  const { translate } = i18nContext

  const [burgerIsActive, setBurgerActive] = React.useState(false)
  const { newEvents, hasNextPage } = React.useContext(EventsContext)

  React.useEffect(() => {
    if (userContext.user && hasNextPage) {
      Socket.emit('events')
    }
  }, [userContext.user])

  const newEventsCount = userContext.user ? newEvents.length : 0
  Title.badgeCount = newEventsCount

  return (
    <nav
      className="navbar is-dark is-fixed-top"
      role="navigation"
      aria-label="main navigation"
      style={{ padding: '0 1rem' }}
    >
      <div className="navbar-brand">
        <Link
          to={path.home}
          onClick={() => setBurgerActive(false)}
          className={'navbar-item has-text-weight-semibold'}
          style={{ textDecoration: 'none' }}
        >
          <Logo
            size={36}
            style={{ fill: 'white' }}
            className="is-hidden-tablet"
          />
          <Logo
            size={42}
            style={{ fill: 'white' }}
            className="is-hidden-mobile"
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
        <div className="navbar-start is-hidden-mobile">
          <Link to={path.explore} className="navbar-item">
            {translate('EXPLORE')}
          </Link>
          <Link to={path.news} className="navbar-item">
            <span
              className={newEventsCount > 0 ? 'badge is-badge-danger' : ''}
              data-badge={newEventsCount}
            >
              {translate('NEWS')}
            </span>
          </Link>
        </div>
        <div className="navbar-end">
          {!userContext.isConnectionPending ? (
            userContext.isConnected() ? (
              <Link
                to={path.profile}
                onClick={() => setBurgerActive(false)}
                className="navbar-item"
              >
                {translate('MY_PROFILE')}
              </Link>
            ) : (
              <React.Fragment>
                <Link
                  to={path.login}
                  onClick={() => setBurgerActive(false)}
                  className="navbar-item has-text-weight-semibold"
                >
                  {translate('LOGIN')}
                </Link>
                <Link
                  to={path.subscribe}
                  onClick={() => setBurgerActive(false)}
                  className="navbar-item"
                >
                  {translate('REGISTER')}
                </Link>
              </React.Fragment>
            )
          ) : null}

          <DropDown className="navbar-item" isHoverable={true} navbar={true}>
            <DropDown.Trigger title={translate('ABOUT')} />
            <DropDown.Menu>
              <DropDown.Item>
                <Link
                  to={path.code}
                  onClick={() => setBurgerActive(false)}
                  className="navbar-item"
                >
                  {translate('ETHIC_CODE')}
                </Link>
              </DropDown.Item>
              <DropDown.Item>
                <Link
                  to={path.contributors}
                  onClick={() => setBurgerActive(false)}
                  className="navbar-item"
                >
                  {translate('CONTRIBUTORS')}
                </Link>
              </DropDown.Item>
              <DropDown.Item>
                <Link
                  to={path.legal}
                  onClick={() => setBurgerActive(false)}
                  className="navbar-item"
                >
                  {translate('LEGAL_MENTIONS')}
                </Link>
              </DropDown.Item>
              <DropDown.Item>
                <Link
                  to="https://github.com/jimmyleray/Emendare"
                  onClick={() => setBurgerActive(false)}
                  className="navbar-item"
                >
                  {translate('SOURCES')}
                </Link>
              </DropDown.Item>
            </DropDown.Menu>
          </DropDown>
          <Divider vertical={true} className={'navbar-item is-hidden-mobile'} />
          <a
            href="#"
            role="button"
            className={`navbar-item ${
              i18nContext.actualLanguage === 'FR' ? 'has-text-weight-bold' : ''
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
    </nav>
  )
}
