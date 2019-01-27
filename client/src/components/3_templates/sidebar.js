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
import { Text } from '../../services'
import { path } from '../../config'

const getAmends = get => text =>
  text.amends
    .map(get('amend'))
    .filter(amend => amend && amend.data)
    .map(amend => amend.data)

export const Sidebar = ({ width }) => (
  <div className="is-hidden-mobile" style={{ flex: 'none', width }}>
    <Notification
      className="is-dark"
      style={{ height: '100%', borderRadius: 0 }}
    >
      <div className="has-text-centered">
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
      <DataContext.Consumer>
        {({ get }) => (
          <UserContext.Consumer>
            {({ user, isConnected, isConnectionPending }) => (
              <>
                {isConnected() ? (
                  <>
                    <div className="has-text-centered">
                      <Link
                        to={path.profile}
                        style={{ textDecoration: 'none' }}
                      >
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
                        {user.followedTexts
                          .map(get('text'))
                          .filter(text => text && text.data)
                          .map(text => text.data)
                          .sort((a, b) => b.followersCount - a.followersCount)
                          .map(followedText => {
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
                                  amends &&
                                  Text.hasOpenAmendUnvoted(user)(amends)
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
              </>
            )}
          </UserContext.Consumer>
        )}
      </DataContext.Consumer>
      <br />
      <p className="is-size-5 has-text-weight-semibold">Liens utiles</p>
      <br />
      <Footer />
    </Notification>
  </div>
)
