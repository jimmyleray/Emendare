import React from 'react'
import { Link, UserContext } from '../../../components'
import { path } from '../../../config'

export const Navbar = () => (
  <nav
    className="navbar is-light"
    role="navigation"
    aria-label="main navigation"
    style={{ padding: '0 1rem' }}
  >
    <div className="navbar-end">
      <UserContext.Consumer>
        {({ isConnected, logout }) =>
          isConnected() ? (
            <>
              <Link
                to={path.profile}
                className="navbar-item has-text-weight-semibold"
              >
                Mon Profil
              </Link>
              <a href={path.home} onClick={logout} className="navbar-item">
                Se déconnecter
              </a>
            </>
          ) : (
            <>
              <Link
                to={path.login}
                className="navbar-item has-text-weight-semibold"
              >
                Connexion
              </Link>
              <Link to={path.subscribe} className="navbar-item">
                Inscription
              </Link>
            </>
          )
        }
      </UserContext.Consumer>
    </div>
  </nav>
)
