/* eslint-disable sonarjs/cognitive-complexity */
import React from 'react'
import {
  Button,
  Footer,
  Link,
  Logo,
  Notification,
  DataContext,
  UserContext
} from '../../components'
import { Text, Title } from '../../services'
import { path } from '../../config'
import { sortBy } from 'lodash'

const getAmends = (get: (type: string) => (id: string) => any) => (text: any) =>
  text.amends
    .map(get('amend'))
    .filter((amend: any) => amend && amend.data)
    .map((amend: any) => amend.data)

export const Sidebar = ({ className, style }: any) => (
  <UserContext.Consumer>
    {({ user, isConnected, isConnectionPending }) => (
      <DataContext.Consumer>
        {({ get }) => {
          const events = get('events')('all')
          let newEventsCount = 0

          if (user && events && events.data) {
            newEventsCount = events.data.filter(
              (event: any) =>
                new Date(event.created).getTime() >
                new Date(user.lastEventDate).getTime()
            ).length

            Title.badgeCount = newEventsCount
          }

          return (
            <Notification
              className={'is-dark ' + className}
              style={{ borderRadius: 0, padding: '1.5rem', ...style }}
            >
              <div className="has-text-centered is-hidden-mobile">
                <Link
                  to={path.home}
                  className="has-text-weight-semibold is-size-4"
                  style={{ textDecoration: 'none' }}
                >
                  <Logo />
                  <span style={{ marginLeft: '6px' }}>Emendare</span>
                </Link>
              </div>
              <br />

              <div className="has-text-centered">
                <Link to={path.home} style={{ textDecoration: 'none' }}>
                  Groupes
                </Link>
                {' - '}
                <Link
                  to={path.news}
                  style={{ textDecoration: 'none' }}
                  className={newEventsCount > 0 ? 'badge is-badge-danger' : ''}
                  data-badge={newEventsCount}
                >
                  Actualités
                </Link>
              </div>
              <br />

              {isConnected() ? (
                <>
                  <div className="has-text-centered">
                    <Link to={path.profile} style={{ textDecoration: 'none' }}>
                      <Button className="is-warning is-fullwidth is-outlined">
                        Mon profil
                      </Button>
                    </Link>
                  </div>

                  {user.followedTexts.length > 0 && (
                    <>
                      <br />
                      <p className="is-size-5 has-text-weight-semibold">
                        Textes suivis
                      </p>
                      <br />
                      {sortBy(
                        user.followedTexts
                          .map(get('text'))
                          .filter((text: any) => text && text.data)
                          .map((text: any) => text.data),
                        ['followersCount']
                      )
                        .reverse()
                        .map((followedText: any) => {
                          const amends = getAmends(get)(followedText)
                          return (
                            <Link
                              key={followedText._id}
                              to={path.text(followedText._id)}
                              style={{
                                textDecoration: 'none',
                                display: 'block',
                                marginBottom: '1rem',
                                marginLeft: '1rem'
                              }}
                              className={
                                amends && Text.hasOpenAmendUnvoted(user)(amends)
                                  ? 'has-text-weight-bold'
                                  : amends &&
                                    Text.hasOpenAmend(amends) &&
                                    !Text.hasOpenAmendUnvoted(user)(amends)
                                  ? 'has-text-weight-semibold'
                                  : ''
                              }
                            >
                              {followedText.name}
                            </Link>
                          )
                        })}
                    </>
                  )}
                </>
              ) : !isConnectionPending ? (
                <div className="has-text-centered">
                  <Link to={path.login} style={{ textDecoration: 'none' }}>
                    <Button className="is-success is-fullwidth is-outlined">
                      Connexion
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="has-text-centered">
                  <Button
                    disabled
                    className="is-warning is-fullwidth is-outlined"
                  >
                    Mon profil
                  </Button>
                </div>
              )}

              <br />
              <p className="is-size-5 has-text-weight-semibold">Liens utiles</p>
              <br />
              <Footer />
            </Notification>
          )
        }}
      </DataContext.Consumer>
    )}
  </UserContext.Consumer>
)
