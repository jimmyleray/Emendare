import React from 'react'
import { Redirect } from 'react-router-dom'
import { ApiContext, Page, Button, Notification } from '../../../components'
import { path } from '../../../config'

export const CreatePage = () => {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [redirect, setRedirect] = React.useState(false)
  const [error, setError] = React.useState<any>(null)
  const { Socket } = React.useContext(ApiContext)

  const confirm = async (event: any) => {
    event.preventDefault()

    await Socket.fetch('postText', {
      name,
      description
    })
      .then(async () => {
        setRedirect(true)
      })
      .catch((err: any) => {
        setError(err)
      })
  }

  if (redirect) {
    return <Redirect to={path.home} />
  }

  return (
    <Page title="Création de texte">
      <form onSubmit={confirm}>
        <div className="field">
          <label htmlFor="name" className="label">
            Nom du nouveau texte
            <div className="control">
              <input
                required
                name="name"
                className="input"
                type="text"
                value={name}
                onChange={event => {
                  setName(event.target.value)
                }}
                placeholder="Nom du nouveau texte"
              />
            </div>
          </label>
        </div>

        <div className="field">
          <label htmlFor="description" className="label">
            Description du nouveau texte
            <div className="control">
              <input
                required
                name="description"
                className="input"
                type="text"
                value={description}
                onChange={event => {
                  setDescription(event.target.value)
                }}
                placeholder="Description du nouveau texte"
              />
            </div>
          </label>
        </div>
        <div className="has-text-centered" style={{ marginTop: '1rem' }}>
          <Button
            className="is-fullwidth is-info"
            disabled={!name || !description}
            type="submit"
          >
            Confirmer la création de ce texte
          </Button>
        </div>

        {error && (
          <React.Fragment>
            <br />
            <Notification className="is-danger has-text-centered">
              {error.message}
            </Notification>
          </React.Fragment>
        )}
      </form>
    </Page>
  )
}
