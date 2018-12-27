import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts'

export const Navbar = () => (
  <nav
    className="navbar is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container is-fluid">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item has-text-weight-semibold">
          Emendare
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/explorer" className="navbar-item">
            Explorer
          </Link>
        </div>
        <div className="navbar-end">
          <UserContext.Consumer>
            {({ isConnected, logout }) =>
              isConnected() ? (
                <>
                  <Link
                    to="/profil"
                    className="navbar-item has-text-weight-semibold"
                  >
                    Mon Profil
                  </Link>
                  <a href="/" onClick={logout} className="navbar-item">
                    Se déconnecter
                  </a>
                </>
              ) : (
                <Link to="/connexion" className="navbar-item">
                  Connexion
                </Link>
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
