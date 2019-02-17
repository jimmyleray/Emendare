/*
 * Page d'attente
 * Le but de cette page est de permettre aux utilisateurs :
 * - de patienter en attendant la fin d'un chargement
 */

import React from 'react'
import { Hero, Page } from '../../../components'

export const PendingPage = () => {
  return (
    <Page title="Chargement">
      <Hero
        title="Chargement en cours"
        subtitle="Merci de patentier quelques instants"
      />
    </Page>
  )
}
