/*
 * Page d'inscription
 * Le but de cette page est de permettre aux utilisateurs :
 * - de s'inscire avec leur email / mot de passe
 * - d'accèder à la page de connexion
 */

import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Page } from '../layouts'
import { socket } from '../utils'

export class SubscribePage extends React.Component {
  constructor(props) {
    super(props)

    this.change = name => event => {
      this.setState({ [name]: event.target.value })
    }

    this.submit = event => {
      event.preventDefault()

      socket
        .fetch('subscribe', {
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
      <Page title="Inscription">
        <form
          onSubmit={this.submit}
          style={{ maxWidth: '350px', margin: 'auto' }}
        >
          <p className="is-size-3 has-text-centered">Créez votre compte</p>
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
                Inscription
              </button>
            </p>
            <p className="control">
              <Link
                to="/connexion"
                className="button is-medium is-info is-outlined"
              >
                J'ai déjà un compte
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
