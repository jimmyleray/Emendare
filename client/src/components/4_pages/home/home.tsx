/*
 * Page d'acceuil
 * Le but de cette page est de permettre aux utilisateurs :
 * - de comprendre l'objectif de la plateforme
 * - d'accéder rapidement à la page d'exploration
 * - d'accèder rapidement à la page d'inscription
 */

import React from 'react'
import {
  Explore,
  Hero,
  News,
  Page,
  UserContext,
  DataContext
} from '../../../components'
import { IUser } from '../../../../../interfaces'
import { Title } from '../../../services'

export const HomePage = () => {
  const [selectedTab, setSelectedTab] = React.useState('texts')

  const userContext = React.useContext(UserContext)
  const dataContext = React.useContext(DataContext)
  const events = dataContext.get && dataContext.get('events')('all')
  let newEventsCount = 0

  if (userContext.user && events && events.data) {
    newEventsCount = events.data.filter(
      (event: any) =>
        new Date(event.created).getTime() >
        new Date((userContext.user as IUser).lastEventDate).getTime()
    ).length

    Title.badgeCount = newEventsCount
  } else {
    Title.badgeCount = 0
  }

  return (
    <Page title="Accueil">
      <Hero
        title="Emendare est une plateforme de rédaction de textes amendables"
        subtitle="Un amendement est une modification d'un texte, soumise au vote d'un groupe"
      />
      <div className="tabs is-boxed is-fullwidth">
        <ul>
          <li className={selectedTab === 'texts' ? 'is-active' : ''}>
            <a
              onClick={() => {
                setSelectedTab('texts')
              }}
            >
              Textes
            </a>
          </li>
          <li className={selectedTab === 'news' ? 'is-active' : ''}>
            <a
              onClick={() => {
                setSelectedTab('news')
              }}
            >
              <span
                className={newEventsCount > 0 ? 'badge is-badge-info' : ''}
                data-badge={newEventsCount}
              >
                Actualités
              </span>
            </a>
          </li>
        </ul>
      </div>
      {selectedTab === 'texts' && <Explore />}
      {selectedTab === 'news' && <News />}
    </Page>
  )
}
