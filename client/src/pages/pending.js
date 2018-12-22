/*
 * Page d'attente
 * Le but de cette page est de permettre aux utilisateurs :
 * - de patienter en attendant la fin d'un chargement
 */

import React from 'react'
import { Page } from '../components'

export const PendingPage = () => {
  return (
    <Page title="Chargement">
      <div className="field has-text-centered">
        <h1 className="is-size-3">Chargement en cours</h1>
        <h2 className="is-size-5">Merci de patentier quelques instants</h2>
      </div>
    </Page>
  )
}
