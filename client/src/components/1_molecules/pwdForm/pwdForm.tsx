import React from 'react'
import { Button, Icon } from '../..'
import { IUser } from '../../../interfaces'
import { Socket, Password } from '../../../services'

interface IPwdFormProps {
  user: IUser
}

interface IPwdFormState {
  password: string
  checkPassword: string
  error: any
  pwdValidLength: boolean
  pwdSame: boolean
}

export class PwdForm extends React.Component<IPwdFormProps, IPwdFormState> {
  constructor(props: IPwdFormProps) {
    super(props)

    this.state = {
      password: '',
      checkPassword: '',
      error: null,
      pwdSame: false,
      pwdValidLength: false
    }
  }

  public componentWillUnmount() {
    Socket.off('update-password')
  }

  private change = (field: string) => (event: any) => {
    switch (field) {
      case 'password':
        this.setState({
          [field]: event.target.value,
          pwdValidLength: Password.isLengthPasswordValid(event.target.value)
        } as any)
        break
      case 'checkPassword':
        this.setState({
          [field]: event.target.value,
          pwdSame: Password.isSamePassword(
            event.target.value,
            this.state.password
          )
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
          pwdValidLength: false
        })
      })
      .catch((error: any) => {
        console.error(error)
        this.setState({ error })
      })
  }

  private setColorInput = (isValid: boolean, inputValue: any) => {
    if (inputValue) {
      if (isValid) {
        return 'input is-success'
      } else {
        return 'input is-danger'
      }
    }
    return 'input'
  }

  private displayHelper(
    isValid: boolean,
    inputValue: any,
    message: { true: string; false: string }
  ) {
    if (inputValue) {
      if (isValid) {
        return <p className="help is-success">{message.true}</p>
      } else {
        return <p className="help is-danger">{message.false}</p>
      }
    }
    return null
  }

  public render() {
    return (
      <form onSubmit={this.submit}>
        <div className="field">
          <label>Changement de mot de passe</label>
          <div className="control has-icons-left has-icons-right">
            <input
              placeholder="Mot de passe"
              value={this.state.password}
              onChange={this.change('password')}
              className={this.setColorInput(
                this.state.pwdValidLength,
                this.state.password
              )}
              aria-label="email input"
              type="password"
            />
            <Icon type="fas fa-lock" className="icon is-medium is-left" />
          </div>
          {this.displayHelper(
            Password.isLengthPasswordValid(this.state.password),
            this.state.password,
            {
              true: 'Mot de passe valide',
              false: 'Le mot de passe doit contenir au moins 8 charactères'
            }
          )}
        </div>
        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input
              placeholder="Vérification du mot de passe"
              value={this.state.checkPassword}
              onChange={this.change('checkPassword')}
              className={this.setColorInput(
                this.state.pwdSame,
                this.state.checkPassword
              )}
              type="password"
              aria-label="password input"
            />
            <Icon type="fas fa-lock" className="icon is-medium is-left" />
          </div>
          {this.displayHelper(
            Password.isSamePassword(
              this.state.password,
              this.state.checkPassword
            ),
            this.state.checkPassword,
            {
              true: 'Mot de passe valide',
              false: 'Les mots de passe ne sont pas les mêmes'
            }
          )}
        </div>
        <div className="field is-grouped is-grouped-right">
          <Button
            type="submit"
            className="is-success"
            disabled={!this.state.pwdValidLength || !this.state.pwdSame}
          >
            Validez
          </Button>
        </div>
      </form>
    )
  }
}
