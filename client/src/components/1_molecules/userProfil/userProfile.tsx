import React from 'react'
import { Button, Box, Icon } from '../../../components'
import { IUser } from '../../../interfaces'
import { Socket } from '../../../services'

interface IUserProfilProps {
  user: IUser
}

interface IUserProfilState {
  email: string
  password: string
  error: any
  success: boolean
}
// TODO: add button to set the email

export class UserProfil extends React.Component<
  IUserProfilProps,
  IUserProfilState
> {
  constructor(props: IUserProfilProps) {
    super(props)

    this.state = {
      email: this.props.user.email,
      password: '',
      error: null,
      success: false
    }
  }

  public componentWillUnmount() {
    Socket.off('update-user')
  }

  private change = (field: string) => (event: any) => {
    this.setState({ [field]: event.target.value } as IUserProfilState)
  }

  private submit = (event: any) => {
    event.preventDefault()
    Socket.fetch('update-user', {
      token: this.props.user.token,
      email: this.state.email,
      password: this.state.password
    })
      .then(() => {
        this.setState({ success: true })
      })
      .catch((error: any) => {
        console.error(error)
        this.setState({ error })
      })
  }

  public render() {
    return (
      <Box>
        <p className="has-text-weight-semibold">Profile utilisateur</p>
        <br />
        <form onSubmit={this.submit}>
          <div className="field">
            <label>Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                placeholder="Email"
                value={this.state.email}
                onChange={this.change('email')}
                className="input is-medium"
                type="email"
              />
              <Icon type="fas fa-envelope" className="icon is-medium is-left" />
            </div>
          </div>
          <div className="field">
            <label>Mot de passe</label>
            <div className="control has-icons-left has-icons-right">
              <input
                placeholder="Mot de passe"
                value={this.state.password}
                onChange={this.change('password')}
                className="input is-medium"
                type="password"
              />
              <Icon type="fas fa-lock" className="icon is-medium is-left" />
            </div>
          </div>
        </form>
      </Box>
    )
  }
}
