import React, { useContext } from 'react'
// Components
import {
  UserContext,
  Card,
  I18nContext,
  Grid,
  Button,
  AuthentificationForm,
  Gravatar
} from '../../../components'

export const ProfilCard = ({ location }: any) => {
  const { user, logout, isConnectionPending } = useContext(UserContext)
  const { translate } = React.useContext(I18nContext)

  return (
    <React.Fragment>
      {!isConnectionPending ? (
        <Card style={{ padding: '1rem' }}>
          {user ? (
            <React.Fragment>
              <div className="has-text-centered">
                <Gravatar email={user.email} />
                <br />
                <p>{user.email}</p>
                <Button
                  onClick={logout}
                  className="is-danger is-fullwidth is-outlined"
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
                    {user.downVotes.length + user.upVotes.length}
                  </div>
                </Grid>
                <Grid style={{ gridTemplateRows: '1fr 1fr' }}>
                  <div className="has-text-weight-semibold">Textes suivis</div>
                  <div className="has-text-info has-text-weight-bold">
                    {user.followedTexts.length}
                  </div>
                </Grid>
              </Grid>
            </React.Fragment>
          ) : (
            <AuthentificationForm location={location} />
          )}
        </Card>
      ) : null}
    </React.Fragment>
  )
}
