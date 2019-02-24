import React from 'react'
import {
  Divider,
  DataContext,
  Link,
  Icon,
  UserContext
} from '../../../components'
import { path } from '../../../config'
import { Title } from '../../../services'
import { IUser } from '../../../../../interfaces'

export const Navbar = () => {
  const userContext = React.useContext(UserContext)
  const dataContext = React.useContext(DataContext)
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

  const [isActive, setActive] = React.useState(false)

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main navigation"
      style={{ padding: '0 1rem' }}
    >
      <div className="container is-fluid">
        <div className="navbar-brand">
          <Link
            to={path.home}
            onClick={() => setActive(false)}
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
            onClick={() => setActive(!isActive)}
            className={'navbar-burger burger ' + (isActive ? 'is-active' : '')}
            aria-label="menu"
            aria-expanded={isActive}
            data-target="navbar-menu"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div
          id="navbar-menu"
          className={'navbar-menu ' + (isActive ? 'is-active' : '')}
        >
          <div className="navbar-end">
            {userContext.isConnected() ? (
              <Link
                to={path.profile}
                onClick={() => setActive(false)}
                className="navbar-item"
              >
                Mon Profil
              </Link>
            ) : (
              <React.Fragment>
                <Link
                  to={path.login}
                  onClick={() => setActive(false)}
                  className="navbar-item has-text-weight-semibold"
                >
                  Connexion
                </Link>
                <Link
                  to={path.subscribe}
                  onClick={() => setActive(false)}
                  className="navbar-item"
                >
                  Inscription
                </Link>
              </React.Fragment>
            )}

            <Divider vertical={true} className="is-hidden-mobile" />

            <Link
              to={path.code}
              onClick={() => setActive(false)}
              className="navbar-item"
            >
              Charte éthique
            </Link>
            <Link
              to={path.contributors}
              onClick={() => setActive(false)}
              className="navbar-item"
            >
              Contributeurs
            </Link>
            <Link
              to={path.legal}
              onClick={() => setActive(false)}
              className="navbar-item"
            >
              Mentions légales
            </Link>

            <Divider vertical={true} className="is-hidden-mobile" />

            <Link
              to="https://github.com/jimmyleray/Emendare"
              onClick={() => setActive(false)}
              className="navbar-item is-hidden-mobile"
              title="Sources / Github"
            >
              <Icon className="fa-lg" type="fab fa-github" />
            </Link>
            <Link
              to="https://github.com/jimmyleray/Emendare"
              onClick={() => setActive(false)}
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
