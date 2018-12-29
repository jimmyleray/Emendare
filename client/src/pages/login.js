/*
 * Page de connexion
 * Le but de cette page est de permettre aux utilisateurs :
 * - de se connecter avec leur email / mot de passe
 * - TODO : d'accèder à la page d'inscription
 * - TODO : d'accèder à une page de récupération de mot de passe
 */

import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Page } from '../layouts'
import { socket } from '../utils'

export class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    this.change = name => event => {
      this.setState({ [name]: event.target.value })
    }

    this.submit = event => {
      event.preventDefault()

      socket
        .fetch('login', {
          password: this.state.password,
          email: this.state.email
        })
        .then(async user => {
          localStorage.setItem('token', user.token)
          await socket.fetch('user')
          this.setState({ redirectToReferrer: true })
        })
        .catch(error => {
          this.setState({ error })
        })
    }

    this.state = {
      email: '',
      password: '',
      error: null,
      redirectToReferrer: false
    }
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: '/profil' }
    }
    if (this.state.redirectToReferrer) return <Redirect to={from} />

    return (
      <Page title="Connexion">
        <form
          onSubmit={this.submit}
          style={{ maxWidth: '350px', margin: 'auto' }}
        >
          <p className="is-size-3 has-text-centered">Se connecter</p>
          <br />
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                placeholder="Email"
                value={this.state.email}
                onChange={this.change('email')}
                className="input is-medium"
                type="email"
                autoFocus={true}
              />
              <span className="icon is-medium is-left">
                <i className="fas fa-envelope" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                placeholder="Mot de passe"
                value={this.state.password}
                onChange={this.change('password')}
                className="input is-medium"
                type="password"
              />
              <span className="icon is-medium is-left">
                <i className="fas fa-lock" />
              </span>
            </p>
          </div>
          <div className="field is-grouped is-grouped-centered">
            <p className="control">
              <button
                type="submit"
                className="button is-medium is-success"
                disabled={!this.state.email || !this.state.password}
              >
                Connexion
              </button>
            </p>
            <p className="control">
              <Link
                to="/inscription"
                className="button is-medium is-info is-outlined"
              >
                Je n'ai pas de compte
              </Link>
            </p>
          </div>
          {this.state.error && (
            <div className="notification is-danger has-text-centered">
              {this.state.error}
            </div>
          )}
        </form>
      </Page>
    )
  }
}
