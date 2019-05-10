import React from 'react'
import { Button, Icon, Page, ApiContext } from '../../../components'
import { path } from '../../../config'

interface IActivatePageProps {
  match: any
}

export const ActivatePage = ({ match }: IActivatePageProps) => {
  const [pending, setPending] = React.useState(true)
  const [activated, setActivated] = React.useState(false)
  const [error, setError] = React.useState<any>(null)
  const { Socket } = React.useContext(ApiContext)

  React.useEffect(() => {
    Socket.fetch('activation', {
      activationToken: match.params.id
    })
      .then(() => {
        setPending(false)
        setActivated(true)
        setError(null)
      })
      .catch((error: any) => {
        setPending(false)
        setError(error)
      })
  }, [])

  return (
    <Page title="Activation">
      <div className="field has-text-centered">
        <Icon
          type={'solid'}
          name={
            pending
              ? 'fa-question-circle'
              : activated
              ? 'fa-check-circle has-text-success'
              : 'fa-times-circle has-text-danger'
          }
          className={'fa-3x is-large'}
          title="Activé"
        />
        <h1 className="is-size-3">Activation de votre compte</h1>
        <h2 className="is-size-5">
          {pending
            ? "Votre compte est en cours d'activation"
            : activated
            ? 'Votre compte a bien été activé'
            : error
            ? error.message
            : "Votre compte n'a pas été activé"}
        </h2>
      </div>

      {activated && (
        <div className="field is-grouped is-grouped-centered">
          <p className="control">
            <Button
              to={path.authentification}
              className="is-success has-text-weight-semibold"
            >
              Se connecter à mon compte
            </Button>
          </p>
        </div>
      )}
    </Page>
  )
}
