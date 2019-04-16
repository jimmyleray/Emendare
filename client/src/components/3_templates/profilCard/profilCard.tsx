import React, { useContext } from 'react'
// Components
import {
  UserContext,
  Icon,
  I18nContext,
  Grid,
  Button,
  Authentification
} from '../../../components'

export const ProfilCard = () => {
  const userContext = useContext(UserContext)
  const { translate } = React.useContext(I18nContext)

  return (
    <div style={{ padding: '20px 20px' }}>
      {userContext.user ? (
        <React.Fragment>
          <div className="has-text-centered">
            <Icon name="fa-user-circle" className="fa-3x is-large" />
            <br />
            <br />
            <p>{userContext.user.email}</p>
            <Button
              onClick={userContext.logout}
              className="is-danger is-fullwidth"
              style={{ marginTop: '0.5rem' }}
            >
              {translate('SIGN_OUT')}
            </Button>
            <hr />
          </div>
          <Grid style={{ gridTemplateColumns: '1fr 1fr' }}>
            <Grid style={{ gridTemplateRows: '1fr 1fr' }}>
              <div className="has-text-weight-semibold">Votes</div>
              <div className="has-text-info has-text-weight-bold">
                {userContext.user.downVotes.length +
                  userContext.user.upVotes.length}
              </div>
            </Grid>
            <Grid style={{ gridTemplateRows: '1fr 1fr' }}>
              <div className="has-text-weight-semibold">Textes suivis</div>
              <div className="has-text-info has-text-weight-bold">
                {userContext.user.followedTexts.length}
              </div>
            </Grid>
          </Grid>
        </React.Fragment>
      ) : (
        <Authentification />
      )}
    </div>
  )
}
