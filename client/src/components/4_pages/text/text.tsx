/*
 * Page de texte
 * Le but de cette page est de permettre aux utilisateurs :
 * - de visualiser la version actuelle du texte
 * - d'accéder à la page pour amender le texte
 * - de visualiser la liste des amendements
 * - d'accéder au détail d'un amendement
 * - de visualiser l'historique des modifications
 */

import React from 'react'
import { DataContext, ErrorPage, Text, Page } from '../../../components'

export const TextPage = ({ location, match }: any) => {
  const data = React.useContext(DataContext)
  const text = data.get('text')(match.params.id)

  return text && text.data ? (
    <Page title={text.data.name || 'Texte'}>
      <Text data={text.data} location={location} />
    </Page>
  ) : text && text.error ? (
    <ErrorPage error={text.error} />
  ) : null
}
