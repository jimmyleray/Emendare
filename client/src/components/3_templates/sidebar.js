import React from 'react'
import {
  Button,
  Footer,
  Icon,
  Link,
  Notification,
  ServerState,
  UserContext
} from '../../components'
import { Text } from '../../services'
import { path } from '../../config'

export const Sidebar = ({ width }) => (
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

          {user ? (
            <>
              <br />
              <div className="has-text-centered">
                <Link to={path.profile} style={{ textDecoration: 'none' }}>
                  <Button className="is-warning is-fullwidth is-outlined">
                    Mon profil
                  </Button>
                </Link>
              </div>
              <br />
              <p className="has-text-weight-semibold">Textes suivis</p>
              <br />
              {user.followedTexts
                .filter(Text.hasOpenAmendUnvoted(user))
                .sort((a, b) => b.followersCount - a.followersCount)
                .map(followedText => (
                  <Link
                    key={followedText._id}
                    to={path.text(followedText._id)}
                    style={{
                      textDecoration: 'none',
                      display: 'block',
                      marginBottom: '1rem',
                      marginLeft: '6px'
                    }}
                  >
                    <Icon
                      className={'fas fa-circle has-text-danger'}
                      title="Vote en cours auquel vous n'avez pas encore participé"
                    />
                    {followedText.name}
                  </Link>
                ))}

              {user.followedTexts
                .filter(
                  followedTexts =>
                    Text.hasOpenAmend(followedTexts) &&
                    !Text.hasOpenAmendUnvoted(user)(followedTexts)
                )
                .sort((a, b) => b.followersCount - a.followersCount)
                .map(followedText => (
                  <Link
                    key={followedText._id}
                    to={path.text(followedText._id)}
                    style={{
                      textDecoration: 'none',
                      display: 'block',
                      marginBottom: '1rem',
                      marginLeft: '6px'
                    }}
                  >
                    <Icon
                      className={'fas fa-circle has-text-success'}
                      title="Vote en cours pour lequel vous avez déjà voté"
                    />
                    {followedText.name}
                  </Link>
                ))}

              {user.followedTexts
                .filter(followedTexts => !Text.hasOpenAmend(followedTexts))
                .sort((a, b) => b.followersCount - a.followersCount)
                .map(followedText => (
                  <Link
                    key={followedText._id}
                    to={path.text(followedText._id)}
                    style={{
                      textDecoration: 'none',
                      display: 'block',
                      marginBottom: '1rem',
                      marginLeft: '6px'
                    }}
                  >
                    <Icon
                      className={'fas fa-circle has-text-light'}
                      title="Pas de vote en cours"
                    />
                    {followedText.name}
                  </Link>
                ))}

              {user.followedTexts.length === 0 && (
                <>
                  <span>Vous ne suivez aucun texte.</span>{' '}
                  <Link to={path.explore}>Explorer ?</Link>
                </>
              )}
            </>
          ) : !isConnectionPending ? (
            <>
              <br />
              <div className="has-text-centered">
                <Link to={path.login} style={{ textDecoration: 'none' }}>
                  <Button className="is-success is-fullwidth is-outlined">
                    Connexion
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <br />
              <div className="has-text-centered">
                <Button disabled className="is-link is-fullwidth is-outlined">
                  Mon profil
                </Button>
              </div>
            </>
          )}
          <br />
          <p className="has-text-weight-semibold">Liens utiles</p>
          <br />
          <Footer />
          <br />
          <ServerState />
        </Notification>
      )}
    </UserContext.Consumer>
  </div>
)
