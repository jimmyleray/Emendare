import React, { useState, useCallback, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
// Components
import { Link, Notification, Input } from '../../../components'
// Services
import { Socket } from '../../../services'
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
  const [error, setError] = useState<any>(null)
  const [redirectToRefferer, setRedirectToRefferer] = useState(false)

  useEffect(() => {
    return () => {
      Socket.off('login')
    }
  })

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
    Socket.fetch('login', {
      password: password,
      email: email
    })
      .then(async ({ token }: any) => {
        localStorage.setItem('token', token)
        await Socket.fetch('user')
        setRedirectToRefferer(true)
      })
      .catch((error: any) => {
        setError(error)
      })
  }

  if (redirectToRefferer) {
    return (
      <Redirect
        to={(location && location.state && location.state.from) || path.home}
      />
    )
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: '350px', margin: 'auto' }}>
      <div className="field">
        <div className="control has-icons-left has-icons-right">
          <Input
            autoFocus={true}
            ariaLabel="email"
            placeholder="Email"
            value={email}
            onChange={change('email')}
            className="input is-medium"
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
            className="input is-medium"
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
      <br />
      {error && (
        <Notification className="is-danger has-text-centered">
          {error.message}
        </Notification>
      )}
    </form>
  )
}
