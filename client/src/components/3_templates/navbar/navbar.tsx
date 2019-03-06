import React from 'react'
import {
  Divider,
  DataContext,
  Link,
  Icon,
  UserContext,
  I18nContext,
  DropDown
} from '../../../components'
import { path } from '../../../config'
import { Title } from '../../../services'
import { IUser } from '../../../../../interfaces'

export const Navbar = () => {
  const userContext = React.useContext(UserContext)
  const dataContext = React.useContext(DataContext)
  const i18nContext = React.useContext(I18nContext)
  const { translate } = i18nContext

  const events = dataContext.get && dataContext.get('events')('all')
  let newEventsCount = 0

  if (userContext.user && events && events.data) {
    newEventsCount = events.data.filter(
      (event: any) =>
        new Date(event.created).getTime() >
        new Date((userContext.user as IUser).lastEventDate).getTime()
    ).length

    Title.badgeCount = newEventsCount
  } else {
    Title.badgeCount = 0
  }

  const [burgerIsActive, setBurgerActive] = React.useState(false)

  return (
    <nav
      className="navbar is-fixed-top is-transparent"
      role="navigation"
      aria-label="main navigation"
      style={{ padding: '0 1rem' }}
    >
      <div className="container">
        <div className="navbar-brand">
          <Link
            to={path.home}
            onClick={() => setBurgerActive(false)}
            className={'navbar-item has-text-weight-semibold'}
            style={{ textDecoration: 'none' }}
          >
            Emendare
          </Link>

          <Link
            to={{ pathname: path.home, search: '?tab=news' }}
            onClick={() => setBurgerActive(false)}
            className="navbar-item"
          >
            <Icon
              type={newEventsCount > 0 ? 'fas fa-bell' : 'far fa-bell'}
              className={newEventsCount > 0 ? 'badge is-badge-danger' : ''}
              data-badge={newEventsCount}
            />
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

            <DropDown className="navbar-item" navbar={true}>
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
            <Divider vertical={true} className={'navbar-item'} />
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
