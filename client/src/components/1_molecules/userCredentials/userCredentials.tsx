import React from 'react'
import { Box, Button, PwdForm, Icon, Notification } from '../../../components'
import { IUser } from '../../../interfaces'
import { Socket } from '../../../services'

interface IUserCredentialsProps {
  user: IUser
}

interface IUserCredentialsStates {
  email: string
  password: string
  checkPassword: string
  error: any
  pwdValid: boolean
  pwdSame: boolean
  showWarning: boolean
}

export class UserCredentials extends React.Component<
  IUserCredentialsProps,
  IUserCredentialsStates
> {
  constructor(props: IUserCredentialsProps) {
    super(props)
    this.state = {
      email: this.props.user.email,
      password: '',
      checkPassword: '',
      error: null,
      pwdSame: false,
      pwdValid: false,
      showWarning: false
    }
  }

  public componentWillUnmount() {
    Socket.off('update-password')
    Socket.off('update-email')
  }

  public render() {
    return (
      <Box>
        <p className="has-text-weight-semibold">Identifiants utilisateur</p>
        <br />
        <p style={{ marginBottom: '2%' }}>Changement d'email</p>
        {!this.state.showWarning ? (
          <form
            onSubmit={() => this.setState({ showWarning: true })}
            style={{ marginBottom: '4%' }}
          >
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.change('email')}
                  className="input"
                  type="email"
                />
                <Icon
                  type="fas fa-envelope"
                  className="icon is-medium is-left"
                />
              </p>
            </div>
            <div className="field is-grouped is-grouped-right">
              <Button type="submit" className="is-success">
                Validez
              </Button>
            </div>
          </form>
        ) : (
          this.displayWarning()
        )}
        <p style={{ marginBottom: '2%' }}>Changement de mot de passe</p>
        <form onSubmit={this.submitPassword}>
          <PwdForm
            change={this.change}
            password={this.state.password}
            checkPassword={this.state.checkPassword}
            pwdSame={this.state.pwdSame}
            pwdValid={this.state.pwdValid}
          />
          <div className="field is-grouped is-grouped-right">
            <Button
              type="submit"
              className="is-success"
              disabled={!this.state.pwdValid || !this.state.pwdSame}
            >
              Validez
            </Button>
          </div>
        </form>
      </Box>
    )
  }

  private change = (field: string, validInput?: boolean) => (event: any) => {
    switch (field) {
      case 'password':
        this.setState({
          [field]: event.target.value,
          pwdValid: validInput ? validInput : false
        } as any)
        break
      case 'checkPassword':
        this.setState({
          [field]: event.target.value,
          pwdSame: validInput ? validInput : false
        } as any)
        break
      default:
        this.setState({
          [field]: event.target.value
        } as any)
    }
  }

  private displayWarning = () => {
    if (this.state.error) {
      return (
        <Notification className="is-danger">
          {this.state.error.message}
          <div
            style={{ marginTop: '2%' }}
            className="field is-grouped is-grouped-right"
          >
            <Button
              onClick={() =>
                this.setState({
                  showWarning: false,
                  error: null,
                  email: this.props.user.email
                })
              }
              className="button is-inverted is-outlined is-danger"
            >
              Ok
            </Button>
          </div>
        </Notification>
      )
    } else {
      return (
        <Notification className="is-warning">
          <strong>Attention</strong> cette action va vous déconnecter, pour vous
          connectez veuillez dans un premier temps{' '}
          <strong>valider votre nouveau mail</strong>
          <div
            style={{ marginTop: '2%' }}
            className="field is-grouped is-grouped-right"
          >
            <Button
              onClick={this.submitEmail}
              className="button is-inverted is-outlined is-warning"
            >
              Ok
            </Button>
          </div>
        </Notification>
      )
    }
  }

  private submitEmail = () => {
    Socket.fetch('update-email', {
      email: this.state.email
    })
      .then(() => {
        this.setState({
          showWarning: false
        })
      })
      .catch((error: any) => {
        console.error(error)
        this.setState({ error })
      })
  }

  private submitPassword = (event: any) => {
    event.preventDefault()
    Socket.fetch('update-password', {
      password: this.state.password
    })
      .then(() => {
        this.setState({
          password: '',
          checkPassword: '',
          pwdSame: false,
          pwdValid: false
        })
      })
      .catch((error: any) => {
        console.error(error)
        this.setState({ error })
      })
  }
}
