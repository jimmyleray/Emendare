import React from 'react'
// Components
import { Link, Notification, Input } from '../../../components'
// Config
import { path } from '../../../config'
import { IError } from '../../../../../interfaces'

interface ILoginFormProps {
  render: any
  /** Function to submit the form */
  submit: any
  /** Value of the email */
  email: string
  /** Function to track change of the inputs values */
  change: any
  /** Value of the password */
  password: string
  /** Error  */
  error: IError | null
}

export const LoginForm = ({
  render,
  submit,
  email,
  change,
  password,
  error
}: ILoginFormProps) => (
  <form onSubmit={submit} style={{ width: '100%' }}>
    <div className="field">
      <div className="control has-icons-left has-icons-right">
        <Input
          autoFocus={true}
          ariaLabel="email"
          placeholder="Email"
          value={email}
          onChange={change('email')}
          className="input"
          type="email"
          iconLeft="fa-envelope"
        />
      </div>
    </div>
    <div className="field">
      <div className="control has-icons-left">
        <Input
          placeholder="Mot de passe"
          ariaLabel="Mot de passe"
          value={password}
          onChange={change('password')}
          className="input"
          type="password"
          iconLeft="fa-lock"
        />
      </div>
      <div className="has-text-right" style={{ marginTop: 4 }}>
        <Link to={path.reset} className="is-text">
          Mot de passe oublié ?
        </Link>
      </div>
    </div>
    <div className="has-text-centered">{render(email, password, submit)}</div>
    {error && (
      <React.Fragment>
        <br />
        <Notification className="is-danger has-text-centered">
          {error.message}
        </Notification>
      </React.Fragment>
    )}
  </form>
)
