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
  Hero
} from '../../../components'

export const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = React.useState('notifications')
  const userContext = React.useContext(UserContext)
  const { translate } = React.useContext(I18nContext)

  return (
    <Page title={translate('MY_PROFILE')}>
      <Hero
        title={translate('MY_PROFILE')}
        subtitle={userContext.user ? userContext.user.email : ''}
      />
      <div>
        <Button onClick={userContext.logout} className="is-danger is-medium">
          {translate('SIGN_OUT')}
        </Button>
      </div>
      <br />
      <div className="tabs is-boxed is-fullwidth">
        <ul>
          <li className={selectedTab === 'notifications' ? 'is-active' : ''}>
            <a
              onClick={() => {
                setSelectedTab('notifications')
              }}
            >
              {translate('NOTIFICATIONS')}
            </a>
          </li>
          <li className={selectedTab === 'data' ? 'is-active' : ''}>
            <a
              onClick={() => {
                setSelectedTab('data')
              }}
            >
              {translate('MY_DATA')}
            </a>
          </li>
          <li className={selectedTab === 'settings' ? 'is-active' : ''}>
            <a
              onClick={() => {
                setSelectedTab('settings')
              }}
            >
              {translate('PARAMETERS')}
            </a>
          </li>
        </ul>
      </div>
      {userContext.user && (
        <React.Fragment>
          {selectedTab === 'notifications' && <NotificationSettings />}
          {selectedTab === 'data' && (
            <React.Fragment>
              <p>{translate('MY_DATA_PROFILE_TEXT')}</p>
              <JSONTree
                data={userContext.user}
                theme="default"
                hideRoot={true}
              />
            </React.Fragment>
          )}
          {selectedTab === 'settings' && (
            <UserCredentials user={userContext.user} />
          )}
        </React.Fragment>
      )}
    </Page>
  )
}
