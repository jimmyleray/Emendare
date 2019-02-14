import React from 'react'
import { Box, Button, PwdForm } from '../../../components'
import { IUser } from '../../../interfaces'
import { Socket } from '../../../services'

interface IUserCredentialsProps {
  user: IUser
}

interface IUserCredentialsStates {
  password: string
  checkPassword: string
  error: any
  pwdValid: boolean
  pwdSame: boolean
}

export class UserCredentials extends React.Component<
  IUserCredentialsProps,
  IUserCredentialsStates
> {
  constructor(props: IUserCredentialsProps) {
    super(props)
    this.state = {
      password: '',
      checkPassword: '',
      error: null,
      pwdSame: false,
      pwdValid: false
    }
  }

  public componentWillUnmount() {
    Socket.off('update-password')
  }

  public render() {
    return (
      <Box>
        <p className="has-text-weight-semibold">Identifiants utilisateur</p>
        <br />
        <form onSubmit={this.submit}>
          <p style={{ marginBottom: '2%' }}>Changement de mot de passe</p>
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
    }
  }

  private submit = (event: any) => {
    event.preventDefault()
    Socket.fetch('update-password', {
      token: this.props.user.token,
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
