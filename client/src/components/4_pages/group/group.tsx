/*
 * Page de groupe
 * Le but de cette page est de permettre aux utilisateurs :
 * - d'accéder aux pages de textes du groupe
 * - d'accéder aux pages de sous-groupes du groupe
 * - TODO : de visualiser les règles de gestion du groupe
 * - TODO : de suivre les évènements liés au groupe
 * - TODO : de suivre l'activité du groupe
 */

import React from 'react'
import { DataContext, ErrorPage, Group, Page } from '../../../components'

export const GroupPage = (props: any) => {
  const data = React.useContext(DataContext)
  const group = data.get('group')(props.match.params.id)

  return group && group.data ? (
    <Page title={group.data.name || 'Groupe'}>
      <Group data={group.data} />
    </Page>
  ) : group && group.error ? (
    <ErrorPage error={group.error} />
  ) : null
}
