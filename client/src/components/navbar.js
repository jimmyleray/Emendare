import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts'

export const Navbar = () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="container is-fluid">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          Emendare
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/explore" className="navbar-item">
            Explorer
          </Link>
        </div>
        <div className="navbar-end">
          <UserContext.Consumer>
            {({ user }) =>
              user ? (
                <Link to="/profile" className="navbar-item">
                  Mon Profil
                </Link>
              ) : (
                <Link to="/login" className="navbar-item">
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
