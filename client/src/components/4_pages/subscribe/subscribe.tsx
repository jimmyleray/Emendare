/*
 * Page d'inscription
 * Le but de cette page est de permettre aux utilisateurs :
 * - de s'inscire avec leur email / mot de passe
 * - d'accèder à la page de connexion
 */

import React from 'react'
import {
  Button,
  Buttons,
  Icon,
  Notification,
  Page,
  PwdForm,
  Hero
} from '../../../components'
import { Socket } from '../../../services'
import { path } from '../../../config'

interface ISubscribePageState {
  email: string
  password: string
  checkPassword: string
  pwdSame: boolean
  pwdValid: boolean
  error: any
  send: boolean
}

export class SubscribePage extends React.Component<{}, ISubscribePageState> {
  private change: any
  private submit: any

  constructor(props: {}) {
    super(props)

    this.change = (name: string, validInput?: boolean) => (event: any) => {
      switch (name) {
        case 'password':
          this.setState({
            [name]: event.target.value,
            pwdValid: validInput ? validInput : false
          } as any)
          break
        case 'checkPassword':
          this.setState({
            [name]: event.target.value,
            pwdSame: validInput ? validInput : false
          } as any)
          break
        default:
          this.setState({ [name]: event.target.value } as any)
      }
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
      checkPassword: '',
      pwdSame: false,
      pwdValid: false,
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
        <Hero title="Créez votre compte" className="has-text-centered" />
        <form
          onSubmit={this.submit}
          style={{ maxWidth: '350px', margin: 'auto' }}
        >
          {!this.state.send && (
            <React.Fragment>
              <div className="field">
                <div className="control has-icons-left has-icons-right">
                  <input
                    autoFocus={true}
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.change('email')}
                    className="input is-medium"
                    type="email"
                    aria-label="email input"
                  />
                  <Icon name="fa-envelope" className="is-medium is-left" />
                </div>
              </div>
              <PwdForm
                change={this.change}
                password={this.state.password}
                checkPassword={this.state.checkPassword}
                pwdSame={this.state.pwdSame}
                pwdValid={this.state.pwdValid}
                className="is-medium"
              />
              <div className="has-text-centered">
                <Buttons>
                  <Button
                    type="submit"
                    className="is-medium is-success is-fullwidth"
                    disabled={
                      !this.state.email ||
                      (!this.state.password && !this.state.pwdValid) ||
                      !this.state.pwdSame
                    }
                  >
                    Inscription
                  </Button>
                  <Button to={path.login} className="is-fullwidth">
                    J'ai déjà un compte
                  </Button>
                </Buttons>
              </div>
              <br />
              {this.state.error && (
                <Notification className="is-danger has-text-centered">
                  {this.state.error.message}
                </Notification>
              )}
            </React.Fragment>
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
