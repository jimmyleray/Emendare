/*
 * Page d'inscription
 * Le but de cette page est de permettre aux utilisateurs :
 * - de s'inscire avec leur email / mot de passe
 * - d'accèder à la page de connexion
 */

import React from 'react'
import { Button, Icon, Notification, Page } from '..'
import { Socket } from '../../services'
import { path } from '../../config'

interface ISubscribePageProps {
  location: any
}

interface ISubscribePageState {
  email: string
  password: string
  error: any
  send: boolean
}

export class SubscribePage extends React.Component<
  ISubscribePageProps,
  ISubscribePageState
> {
  private change: any
  private submit: any

  constructor(props: ISubscribePageProps) {
    super(props)

    this.change = (name: string) => (event: any) => {
      this.setState({ [name]: event.target.value } as any)
    }

    this.submit = (event: any) => {
      event.preventDefault()

      Socket.fetch('subscribe', {
        password: this.state.password,
        email: this.state.email
      })
        .then(() => {
          this.setState({ send: true, error: null })
        })
        .catch(error => {
          this.setState({ error })
        })
    }

    this.state = {
      email: '',
      password: '',
      error: null,
      send: false
    }
  }

  public componentWillUnmount() {
    Socket.off('subscribe')
  }

  public render() {
    return (
      <Page title="Inscription">
        <form
          onSubmit={this.submit}
          style={{ maxWidth: '350px', margin: 'auto' }}
        >
          <p className="is-size-3 has-text-centered">Créez votre compte</p>
          <br />

          {!this.state.send && (
            <>
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.change('email')}
                    className="input is-medium"
                    type="email"
                  />
                  <Icon
                    type="fas fa-envelope"
                    className="icon is-medium is-left"
                  />
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
                  <Button to={path.login} className="is-medium">
                    J'ai déjà un compte
                  </Button>
                </div>
              </div>
              {this.state.error && (
                <Notification className="is-danger has-text-centered">
                  {this.state.error.message}
                </Notification>
              )}
            </>
          )}

          {this.state.send && (
            <Notification className="is-success has-text-centered">
              Vous allez recevoir dans quelques instants un email avec un lien
              pour activer votre compte. Pensez le cas échéant à vérifier vos
              spams.
            </Notification>
          )}
        </form>
      </Page>
    )
  }
}
