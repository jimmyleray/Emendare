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
import { DataContext, ErrorPage, Group, Page } from '../../components'

export const GroupPage = (props: any) => (
  <DataContext.Consumer>
    {({ get }) => {
      const group = get('group')(props.match.params.id)

      if (group) {
        if (group.error) {
          return <ErrorPage error={group.error} />
        } else if (group.data) {
          return (
            <Page title={group.data.name || 'Groupe'}>
              <Group data={group.data} />
            </Page>
          )
        }
      }
    }}
  </DataContext.Consumer>
)
