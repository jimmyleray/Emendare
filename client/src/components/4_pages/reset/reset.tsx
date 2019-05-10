/**
 * Reiniliaze password Page
 * The goal of this page is to allow the user to receive, by mail,
 * a new password
 */
import React from 'react'
import {
  Page,
  Icon,
  Button,
  Notification,
  ApiContext
} from '../../../components'
import { IError } from '../../../../../interfaces'

export const ResetPage = () => {
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState<IError | null>(null)
  const [send, setSend] = React.useState(false)
  const { Socket } = React.useContext(ApiContext)

  const submit = (event: any) => {
    event.preventDefault()

    Socket.fetch('reset-password', {
      email
    })
      .then(() => {
        setSend(true)
        setError(null)
      })
      .catch(setError)
  }

  React.useEffect(() => {
    return () => {
      Socket.off('reset-password')
    }
  }, [])

  return (
    <Page title="Reset password">
      <form onSubmit={submit} style={{ maxWidth: '350px', margin: 'auto' }}>
        <p className="is-size-3 has-text-centered">Mot de passe oublié</p>
        <br />
        {!send && (
          <React.Fragment>
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <input
                  autoFocus={true}
                  placeholder="Email"
                  onChange={event => {
                    setEmail(event.target.value)
                  }}
                  value={email}
                  className="input is-medium"
                  type="email"
                  aria-label="email input"
                />
                <Icon
                  type={'solid'}
                  name="fa-envelope"
                  className="is-medium is-left"
                />
              </div>
            </div>
            <div className=" has-text-centered">
              <Button
                type="submit"
                className="is-medium is-success is-fullwidth"
                disabled={!email}
              >
                Réinitialiser le mot de passe
              </Button>
            </div>
            <br />
            {error && (
              <Notification className="is-danger has-text-centered">
                {error.message}
              </Notification>
            )}
          </React.Fragment>
        )}
        {send && (
          <Notification className="is-success has-text-centered">
            Vous allez recevoir dans quelques instants un email avec votre
            nouveau mot de passe. Pensez le cas échéant à vérifier vos spams.
          </Notification>
        )}
      </form>
    </Page>
  )
}
