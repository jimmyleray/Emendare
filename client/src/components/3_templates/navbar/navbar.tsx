import React from 'react'
import {
  Divider,
  DataContext,
  Link,
  Icon,
  UserContext,
  I18nContext
} from '../../../components'
import { path } from '../../../config'
import { Title } from '../../../services'
import { IUser } from '../../../../../interfaces'

export const Navbar = () => {
  const userContext = React.useContext(UserContext)
  const dataContext = React.useContext(DataContext)
  const i18nContext = React.useContext(I18nContext)
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
      className="navbar"
      role="navigation"
      aria-label="main navigation"
      style={{ padding: '0 1rem' }}
    >
      <div className="container">
        <div className="navbar-brand">
          <Link
            to={path.home}
            onClick={() => setBurgerActive(false)}
            className="navbar-item has-text-weight-semibold"
            style={{ textDecoration: 'none' }}
          >
            <span
              className={newEventsCount > 0 ? 'badge is-badge-info' : ''}
              data-badge={newEventsCount}
            >
              Emendare
            </span>
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
            {userContext.isConnected() ? (
              <Link
                to={path.profile}
                onClick={() => setBurgerActive(false)}
                className="navbar-item"
              >
                Mon Profil
              </Link>
            ) : (
              <React.Fragment>
                <Link
                  to={path.login}
                  onClick={() => setBurgerActive(false)}
                  className="navbar-item has-text-weight-semibold"
                >
                  Connexion
                </Link>
                <Link
                  to={path.subscribe}
                  onClick={() => setBurgerActive(false)}
                  className="navbar-item"
                >
                  Inscription
                </Link>
              </React.Fragment>
            )}

            <Divider vertical={true} className="is-hidden-mobile" />

            <Link
              to={path.code}
              onClick={() => setBurgerActive(false)}
              className="navbar-item"
            >
              Charte éthique
            </Link>
            <Link
              to={path.contributors}
              onClick={() => setBurgerActive(false)}
              className="navbar-item"
            >
              Contributeurs
            </Link>
            <Link
              to={path.legal}
              onClick={() => setBurgerActive(false)}
              className="navbar-item"
            >
              Mentions légales
            </Link>

            <Divider vertical={true} className="is-hidden-mobile" />

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">{i18nContext.locale}</a>

              {i18nContext.languages
                .filter(language => language !== i18nContext.locale)
                .map(language => (
                  <div key={language} className="navbar-dropdown">
                    <a
                      className="navbar-item"
                      onClick={() => {
                        i18nContext.setLocaleWithStorage(language)
                      }}
                    >
                      {language}
                    </a>
                  </div>
                ))}
            </div>

            <Link
              to="https://github.com/jimmyleray/Emendare"
              onClick={() => setBurgerActive(false)}
              className="navbar-item is-hidden-mobile"
              title="Sources / Github"
            >
              <Icon className="fa-lg" type="fab fa-github" />
            </Link>
            <Link
              to="https://github.com/jimmyleray/Emendare"
              onClick={() => setBurgerActive(false)}
              className="navbar-item is-hidden-tablet"
            >
              Sources
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
