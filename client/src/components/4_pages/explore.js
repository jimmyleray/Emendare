/*
 * Page d'exploration
 * Le but de cette page est de permettre aux utilisateurs :
 * - de découvrir des contenus à suivre sur Emendare
 */

import React from 'react'
import { DataContext, ErrorPage, Group, Page } from '../../components'

export const ExplorePage = () => (
  <DataContext.Consumer>
    {({ get }) => {
      const group = get('group')('root')

      if (group) {
        if (group.error) {
          return <ErrorPage error={group.error} />
        } else if (group.data) {
          return (
            <Page title={'Explorer'}>
              <Group data={group.data} />
            </Page>
          )
        }
      }
    }}
  </DataContext.Consumer>
)
