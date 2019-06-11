import React, { useState, useCallback, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
// Components
import { Link, Notification, Input, useUser } from '../../../components'
// Config
import { path } from '../../../config'

interface ILoginPageProps {
  location?: any
  /** Render Props to display all the buttons */
  render: any
}

export const LoginForm = ({ location, render }: ILoginPageProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirectToRefferer, setRedirectToRefferer] = useState(false)
  const { login, errorAuth } = useUser()

  const change = useCallback(
    (name: string) => (event: any) => {
      if (name === 'email') {
        setEmail(event.target.value)
      } else if (name === 'password') {
        setPassword(event.target.value)
      }
    },
    []
  )

  const submit = (event: any) => {
    event.preventDefault()
    login(email, password)
  }

  if (redirectToRefferer) {
    return (
      <Redirect
        to={(location && location.state && location.state.from) || path.home}
      />
    )
  }

  return (
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
      {errorAuth && (
        <React.Fragment>
          <br />
          <Notification className="is-danger has-text-centered">
            {errorAuth.message}
          </Notification>
        </React.Fragment>
      )}
    </form>
  )
}
