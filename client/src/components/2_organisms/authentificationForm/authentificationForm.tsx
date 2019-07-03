import React from 'react'
// Components
import {
  Button,
  LoginFormContainer,
  SubscribeFormContainer,
  Buttons
} from '../../../components'
// Hooks
import { useToggle } from '../../../hooks'
// Helpers
import { callAll } from '../../../helpers'

interface IAuthentificationFormProps {
  location?: any
}

export const AuthentificationForm = ({
  location
}: IAuthentificationFormProps) => {
  const loginToggle = useToggle(true)
  const subscribeToggle = useToggle(false)

  return (
    <React.Fragment>
      {displayLogin(
        loginToggle.on,
        loginToggle.toggler,
        subscribeToggle.toggler,
        location
      )}
      {displaySubscribe(
        subscribeToggle.on,
        subscribeToggle.toggler,
        loginToggle.toggler
      )}
    </React.Fragment>
  )
}

const displayLogin = (
  loginToggleState: boolean,
  loginToggler: () => void,
  subscribeToggler: () => void,
  location?: any
) => {
  return loginToggleState ? (
    <LoginFormContainer
      location={location}
      render={(email: string, password: string) => (
        <Buttons>
          <Button
            type="submit"
            className="is-info is-fullwidth"
            disabled={!email || !password}
          >
            Connexion
          </Button>
          <Button
            onClick={callAll(loginToggler, subscribeToggler)}
            className="is-fullwidth is-outlined"
          >
            Je n'ai pas de compte
          </Button>
        </Buttons>
      )}
    />
  ) : null
}

const displaySubscribe = (
  subscribeToggleState: boolean,
  subscribeToggler: () => void,
  loginToggler: () => void
) => {
  return subscribeToggleState ? (
    <SubscribeFormContainer
      render={(
        email: string,
        password: string,
        checkPassword: string,
        pwdValid: boolean,
        pwdSame: boolean
      ) => {
        return (
          <Buttons>
            <Button
              type="submit"
              className="is-info is-fullwidth"
              disabled={!email || (!password && !pwdValid) || !pwdSame}
            >
              Inscription
            </Button>
            <Button
              onClick={callAll(subscribeToggler, loginToggler)}
              className="is-fullwidth is-outlined"
            >
              J'ai déjà un compte
            </Button>
          </Buttons>
        )
      }}
    />
  ) : null
}
