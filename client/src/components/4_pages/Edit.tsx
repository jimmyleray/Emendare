/*
 * Page d'amendement
 * Le but de cette page est de permettre aux utilisateurs :
 * - de visualiser la version actuelle du texte
 * - d'éditer le texte et de visualiser les modification
 * - d'écrire un argumentaire pour défendre l'amendement
 * - de valider l'ajout de l'amendement à la liste du texte
 * - TODO : de mettre à jour l'amendement sur la dernière version du texte
 * - d'accéder au détail d'un amendement
 */

import React from 'react'
import { DataContext, ErrorPage, Edit, Page } from '..'

export const EditPage = (props: any) => (
  <DataContext.Consumer>
    {({ get }) => {
      const text = get('text')(props.match.params.id)

      if (text) {
        if (text.error) {
          return <ErrorPage error={text.error} />
        } else if (text.data) {
          return (
            <Page title={'Amendement de ' + text.data.name}>
              <Edit data={text.data} />
            </Page>
          )
        }
      }
    }}
  </DataContext.Consumer>
)
