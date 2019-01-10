/*
 * Page d'inscription
 * Le but de cette page est de permettre aux utilisateurs :
 * - de s'inscire avec leur email / mot de passe
 * - d'accèder à la page de connexion
 */

import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Icon, Notification, Page } from '../../components'
import { socket } from '../../services'
import { path } from '../../config'

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

  componentWillUnmount() {
    socket.off('subscribe')
  }

  render() {
    if (this.state.redirectToReferrer)
      return (
        <Redirect
          to={
            (this.props.location.state && this.props.location.state.from) ||
            path.profile
          }
        />
      )

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
              />
              <Icon type="fas fa-envelope" className="icon is-medium is-left" />
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
              <Icon type="fas fa-lock" className="icon is-medium is-left" />
            </p>
          </div>
          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <Button
                type="submit"
                className="is-medium is-success"
                disabled={!this.state.email || !this.state.password}
              >
                Inscription
              </Button>
            </div>
            <div className="control">
              <Button to={path.login} className="is-medium is-info is-outlined">
                J'ai déjà un compte
              </Button>
            </div>
          </div>
          {this.state.error && (
            <Notification className="is-danger has-text-centered">
              {this.state.error.message}
            </Notification>
          )}
        </form>
      </Page>
    )
  }
}
