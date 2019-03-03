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
import { useTabs } from '../../../hooks'

export const HomePage = ({ location }: any) => {
  const {
    selectedTab,
    setSelectedTab,
    selectNextTab,
    selectPreviousTab
  } = useTabs(['texts', 'news'], 0)

  React.useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSelectedTab(params.get('tab') || 'texts')
  }, [location])

  const { translate } = React.useContext(I18nContext)
  const userContext = React.useContext(UserContext)
  const dataContext = React.useContext(DataContext)

  React.useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        selectNextTab()
      } else if (event.key === 'ArrowLeft') {
        selectPreviousTab()
      }
    }

    document.addEventListener('keyup', eventHandler)
    return () => {
      document.removeEventListener('keyup', eventHandler)
    }
  })

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
        className="has-text-centered"
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
                className={newEventsCount > 0 ? 'badge is-badge-danger' : ''}
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
