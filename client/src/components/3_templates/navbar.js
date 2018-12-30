import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../components'
import { path } from '../../config'

export const Navbar = () => (
  <nav
    className="navbar is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container is-fluid">
      <div className="navbar-brand">
        <Link to={path.home} className="navbar-item has-text-weight-semibold">
          <img src={'/images/logo.png'} alt={'Emendare logo'} />
          <span style={{ marginLeft: '3px' }}>Emendare</span>
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to={path.news} className="navbar-item">
            Actualités
          </Link>
          <Link to={path.explore} className="navbar-item">
            Explorer
          </Link>
        </div>
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
          <a
            href="https://gitlab.com/emendare/emendare"
            className="navbar-item"
          >
            GitLab
          </a>
        </div>
      </div>
    </div>
  </nav>
)
