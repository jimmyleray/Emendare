/*
 * Page de profil
 * Le but de cette page est de permettre aux utilisateurs :
 * - de visualiser les informations liées à son compte
 * - de supprimer leur compte et leurs données
 * - de changer d'email
 * - de changer de mot de passe
 * - de paramétrer les détails de son compte
 */

import React from 'react'
import JSONTree from 'react-json-tree'
import {
  Button,
  Page,
  NotificationSettings,
  UserCredentials,
  I18nContext,
  UserContext,
  Hero,
  Tabs
} from '../../../components'

export const ProfilePage = () => {
  const userContext = React.useContext(UserContext)
  const { translate } = React.useContext(I18nContext)

  return (
    <Page title={translate('MY_PROFILE')}>
      <Hero
        title={translate('MY_PROFILE')}
        subtitle={userContext.user ? userContext.user.email : ''}
        className="has-text-centered"
      />
      <div className="has-text-centered">
        <Button onClick={userContext.logout} className="is-danger is-medium">
          {translate('SIGN_OUT')}
        </Button>
      </div>
      <br />
      <Tabs tabsName={['notifications', 'settings', 'data']}>
        <Tabs.Menu className="is-fullwidth">
          <Tabs.Tab to="notifications">{translate('NOTIFICATIONS')}</Tabs.Tab>
          <Tabs.Tab to="settings">{translate('PARAMETERS')}</Tabs.Tab>
          <Tabs.Tab to="data"> {translate('MY_DATA')}</Tabs.Tab>
        </Tabs.Menu>
        {userContext.user && (
          <React.Fragment>
            <Tabs.Content for="notifications">
              <NotificationSettings />
            </Tabs.Content>
            <Tabs.Content for="settings">
              <UserCredentials user={userContext.user} />
            </Tabs.Content>
            <Tabs.Content for="data">
              <React.Fragment>
                <p>{translate('MY_DATA_PROFILE_TEXT')}</p>
                <JSONTree
                  data={userContext.user}
                  theme="default"
                  hideRoot={true}
                />
              </React.Fragment>
            </Tabs.Content>
          </React.Fragment>
        )}
      </Tabs>
    </Page>
  )
}
