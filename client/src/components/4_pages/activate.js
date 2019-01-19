import React from 'react'
import { Button, Icon, Page } from '../../components'
import { path } from '../../config'

export const ActivatePage = () => (
  <Page title="Activation">
    <div className="field has-text-centered">
      <Icon
        className="fas fa-3x fa-check-circle has-text-success"
        title="Activé"
      />
      <h1 className="is-size-3">Activation de votre compte</h1>
      <h2 className="is-size-5">Votre compte a bien été activé !</h2>
    </div>
    <div className="field is-grouped is-grouped-centered">
      <p className="control">
        <Button to={path.home} className="is-medium is-success">
          Retour à l'accueil
        </Button>
      </p>
    </div>
  </Page>
)
