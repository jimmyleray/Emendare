/*
 * Page de texte
 * Le but de cette page est de permettre aux utilisateurs :
 * - de visualiser la version actuelle du texte
 * - d'accéder à la page pour amender le texte
 * - de visualiser la liste des amendements
 * - d'accéder au détail d'un amendement
 * - TODO : de voter pour les amendements préferés
 * - TODO : de visualiser l'historique des modifications
 * - TODO : de visualiser le vote en cours
 * - TODO : de participer au vote en cours
 * - TODO : de suivre l'activité du texte
 */

import React from 'react'
import { DataContext, ErrorPage, Text, Page } from '../../../components'

export const TextPage = (props: any) => {
  const data = React.useContext(DataContext)
  const text = data.get('text')(props.match.params.id)

  return text && text.data ? (
    <Page title={text.data.name || 'Texte'}>
      <Text data={text.data} />
    </Page>
  ) : text && text.error ? (
    <ErrorPage error={text.error} />
  ) : null
}
