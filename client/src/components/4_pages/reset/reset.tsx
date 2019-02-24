/**
 * Reiniliaze password Page
 * The goal of this page is to allow the user to receive, by mail,
 * a new password
 */
import React from 'react'
import { Page, Icon, Button, Notification } from '../../../components'
import { IError } from '../../../../../interfaces'
import { Socket } from '../../../services'

interface IResetPageState {
  email: string
  error: IError | null
  send: boolean
}

export class ResetPage extends React.Component<{}, IResetPageState> {
  constructor(props: {}) {
    super(props)

    this.state = {
      email: '',
      error: null,
      send: false
    }
  }
  public componentWillUnmount() {
    Socket.off('reset-password')
  }

  public render() {
    return (
      <Page title="Reset password">
        <form
          onSubmit={this.submit}
          style={{ maxWidth: '350px', margin: 'auto' }}
        >
          <p className="is-size-3 has-text-centered">Mot de passe oublié</p>
          <br />
          {!this.state.send && (
            <React.Fragment>
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    autoFocus={true}
                    placeholder="Email"
                    onChange={this.change('email')}
                    value={this.state.email}
                    className="input is-medium"
                    type="email"
                    aria-label="email input"
                  />
                  <Icon
                    type="fas fa-envelope"
                    className="icon is-medium is-left"
                  />
                </p>
              </div>
              <div className=" has-text-centered">
                <Button
                  type="submit"
                  className="is-medium is-success is-fullwidth"
                  disabled={!this.state.email}
                >
                  Réinitialiser le mot de passe
                </Button>
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
              Vous allez recevoir dans quelques instants un email avec votre
              nouveau mot de passe. Pensez le cas échéant à vérifier vos spams.
            </Notification>
          )}
        </form>
      </Page>
    )
  }

  private change = (name: string) => (event: any) => {
    this.setState({ [name]: event.target.value } as IResetPageState)
  }

  private submit = (event: any) => {
    event.preventDefault()

    Socket.fetch('reset-password', {
      email: this.state.email
    })
      .then(() => {
        this.setState({ send: true, error: null })
      })
      .catch(error => {
        this.setState({ error })
      })
  }
}
