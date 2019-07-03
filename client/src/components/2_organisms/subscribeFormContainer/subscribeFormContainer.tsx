import React, { useState, useCallback } from 'react'
// Components
import {
  Icon,
  Notification,
  PwdForm,
  useUser,
  SubscribeForm
} from '../../../components'

interface ISubscribeFormContainerProps {
  /** render props of the submit buttons */
  render: any
}

export const SubscribeFormContainer = ({
  render
}: ISubscribeFormContainerProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [pwdSame, setPwdSame] = useState(false)
  const [pwdValid, setPwdValid] = useState(false)
  const [send] = useState(false)
  const { register, errorAuth } = useUser()

  const submit = (event: any) => {
    event.preventDefault()
    register(email, password)
  }

  const change = useCallback(
    (name: string, validInput?: boolean) => (event: any) => {
      switch (name) {
        case 'password':
          setPassword(event.target.value)
          setPwdValid(validInput ? validInput : false)
          break
        case 'checkPassword':
          setCheckPassword(event.target.value)
          setPwdSame(validInput ? validInput : false)
          break
        case 'email':
          setEmail(event.target.value)
      }
    },
    []
  )

  return (
    <SubscribeForm
      email={email}
      change={change}
      render={render}
      password={password}
      checkPassword={checkPassword}
      pwdSame={pwdSame}
      pwdValid={pwdValid}
      send={send}
      error={errorAuth}
      submit={submit}
    />
  )
}
