/* eslint-disable sonarjs/cognitive-complexity */
import React from 'react'
import {
  Button,
  Footer,
  Link,
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
  <DataContext.Consumer>
    {({ get }) => (
      <div className="is-hidden-mobile" style={{ flex: 'none', width }}>
        <UserContext.Consumer>
          {({ user, isConnectionPending }) => (
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
                  <img
                    src={'/images/logo.png'}
                    alt={'Emendare logo'}
                    style={{
                      filter: 'invert(1)',
                      verticalAlign: 'middle',
                      width: '48px'
                    }}
                  />
                  <span style={{ marginLeft: '6px' }}>Emendare</span>
                </Link>
              </div>
              <br />

              {user ? (
                <>
                  <div className="has-text-centered">
                    <Link to={path.profile} style={{ textDecoration: 'none' }}>
                      <Button className="is-warning is-fullwidth is-outlined">
                        Mon profil
                      </Button>
                    </Link>
                  </div>
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

                  {user.followedTexts.length === 0 && (
                    <>
                      <span>Vous ne suivez aucun texte.</span>{' '}
                      <Link to={path.explore}>Explorer ?</Link>
                      <br />
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
          )}
        </UserContext.Consumer>
      </div>
    )}
  </DataContext.Consumer>
)
