import React, { useState, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
// Components
import { LoginForm, useUser } from '../../../components'
// Config
import { path } from '../../../config'

interface ILoginFormContainerProps {
  location?: any
  render: any
}

export const LoginFormContainer = ({
  location,
  render
}: ILoginFormContainerProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirectToRefferer] = useState(false)
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
    <LoginForm
      render={render}
      change={change}
      email={email}
      password={password}
      error={errorAuth}
      submit={submit}
    />
  )
}
