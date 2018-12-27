/*
 * Page de connexion
 * Le but de cette page est de permettre aux utilisateurs :
 * - de se connecter avec leur email / mot de passe
 * - TODO : d'accèder à la page d'inscription
 * - TODO : d'accèder à une page de récupération de mot de passe
 */

import React from 'react'
import { Redirect } from 'react-router-dom'
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
        .then(user => {
          localStorage.setItem('token', user.token)
          socket.emit('user')
          this.setState({ redirectToReferrer: true })
        })
        .catch(error => {
          this.setState({ error })
        })
    }

    this.state = {
      email: '',
      password: '',
      error: '',
      redirectToReferrer: false
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    if (this.state.redirectToReferrer) return <Redirect to={from} />

    return (
      <Page title="Connexion">
        <form onSubmit={this.submit}>
          <div className="field">
            <label className="label is-medium">Email</label>
            <p className="control has-icons-left has-icons-right">
              <input
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
            <label className="label is-medium">Mot de passe</label>
            <p className="control has-icons-left">
              <input
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
          <div className="field">
            <p className="control">
              <button type="submit" className="button is-medium is-success">
                Connexion
              </button>
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
