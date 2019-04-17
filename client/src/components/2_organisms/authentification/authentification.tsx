import React from 'react'
// Components
import {
  Icon,
  I18nContext,
  Button,
  LoginForm,
  SubscribeForm,
  Buttons
} from '../..'
// Hooks
import { useToggle } from '../../../hooks'
// Helpers
import { callAll } from '../../../helpers'

export const Authentification = () => {
  const loginToggle = useToggle(true)
  const subscribeToggle = useToggle(false)

  return (
    <React.Fragment>
      <div className="has-text-centered">
        <Icon name="fa-user-circle" className="fa-3x is-large" />
      </div>
      <br />
      <div>
        {displayLogin(
          loginToggle.on,
          loginToggle.toggler,
          subscribeToggle.toggler
        )}
        {displaySubscribe(
          subscribeToggle.on,
          subscribeToggle.toggler,
          loginToggle.toggler
        )}
      </div>
    </React.Fragment>
  )
}

const displayLogin = (
  loginToggleState: boolean,
  loginToggler: () => void,
  subscribeToggler: () => void
) => {
  return loginToggleState ? (
    <LoginForm
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
    <SubscribeForm
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
