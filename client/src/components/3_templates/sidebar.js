import React from 'react'
import {
  Footer,
  Icon,
  Notification,
  ServerState,
  UserContext
} from '../../components'
import { Text } from '../../services'
import { Link } from 'react-router-dom'
import { path } from '../../config'

export const Sidebar = ({ width }) => (
  <div className="is-hidden-mobile" style={{ flex: 'none', width }}>
    <UserContext.Consumer>
      {({ user }) => (
        <Notification
          className="is-dark"
          style={{ height: '100%', borderRadius: 0 }}
        >
          <p className="has-text-weight-semibold">Textes suivis</p>
          <br />
          {user ? (
            <>
              {user.followedTexts
                .filter(Text.hasOpenAmendUnvoted(user))
                .map(followedText => (
                  <Link
                    key={followedText._id}
                    to={path.text(followedText._id)}
                    style={{
                      textDecoration: 'none',
                      display: 'block',
                      marginBottom: '1rem'
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
                .map(followedText => (
                  <Link
                    key={followedText._id}
                    to={path.text(followedText._id)}
                    style={{
                      textDecoration: 'none',
                      display: 'block',
                      marginBottom: '1rem'
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
                .map(followedText => (
                  <Link
                    key={followedText._id}
                    to={path.text(followedText._id)}
                    style={{
                      textDecoration: 'none',
                      display: 'block',
                      marginBottom: '1rem'
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
          ) : (
            <>
              <span>Vous n'êtes pas connecté.</span>{' '}
              <Link to={path.login}>Se connecter ?</Link>
            </>
          )}
          <br />
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
