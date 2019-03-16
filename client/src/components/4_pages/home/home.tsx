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
  I18nContext,
  Tabs
} from '../../../components'
import { IUser } from '../../../../../interfaces'
import { Title } from '../../../services'

export const HomePage = ({ location }: any) => {
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
        className="has-text-centered"
      />
      <Tabs tabsName={['texts', 'news']} location={location}>
        <Tabs.Menu className="is-fullwidth">
          <Tabs.Tab to="texts">{translate('TEXTS')}</Tabs.Tab>
          <Tabs.Tab to="news">{translate('NEWS')}</Tabs.Tab>
        </Tabs.Menu>
        <Tabs.Content for="texts">
          <Explore />
        </Tabs.Content>
        <Tabs.Content for="news">
          <News />
        </Tabs.Content>
      </Tabs>
    </Page>
  )
}
