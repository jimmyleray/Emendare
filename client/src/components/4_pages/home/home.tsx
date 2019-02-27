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
  DataContext,
  I18nContext
} from '../../../components'
import { IUser } from '../../../../../interfaces'
import { Title } from '../../../services'

export const HomePage = () => {
  const [selectedTab, setSelectedTab] = React.useState('texts')

  const { translate } = React.useContext(I18nContext)
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
    <Page title={translate('HOME')}>
      <Hero
        title={translate('HOME_TITLE')}
        subtitle={translate('HOME_SUBTITLE')}
      />
      <div className="tabs is-boxed is-fullwidth">
        <ul>
          <li className={selectedTab === 'texts' ? 'is-active' : ''}>
            <a
              onClick={() => {
                setSelectedTab('texts')
              }}
            >
              {translate('TEXTS')}
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
                {translate('NEWS')}
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
