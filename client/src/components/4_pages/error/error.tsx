/*
 * Page d'erreur introuvable
 * Le but de cette page est de permettre aux utilisateurs :
 * - de comprendre que la page demandée est introuvable
 * - d'accéder rapidement à la page d'acceuil
 */

import React from 'react'
import { Button, Hero, Page, I18nContext } from '../../../components'
import { path } from '../../../config'

const defaultError = {
  code: 404,
  message: "Oups, cette page n'existe pas ou plus"
}

export const ErrorPage = ({ error = defaultError }) => {
  const { translate } = React.useContext(I18nContext)

  return (
    <Page title="Erreur">
      <Hero
        title={translate('ERROR') + ' ' + error.code}
        subtitle={error.message}
        className="has-text-centered"
      />
      <div className="has-text-centered">
        <Button to={path.home} className="has-text-weight-semibold is-primary">
          {translate('BACK_HOME')}
        </Button>
      </div>
    </Page>
  )
}
