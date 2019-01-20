import React from 'react'
import { Button, Icon, Notification, Page } from '../../components'
import { path } from '../../config'
import { Socket } from '../../services'

export class ActivatePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pending: true,
      activated: false,
      error: null
    }
  }

  componentDidMount() {
    Socket.fetch('activation', {
      activationToken: this.props.match.params.id
    })
      .then(() => {
        this.setState({ pending: false, activated: true, error: null })
      })
      .catch(error => {
        this.setState({ pending: false, error })
      })
  }

  render() {
    return (
      <Page title="Activation">
        <div className="field has-text-centered">
          <Icon
            className={
              'fas fa-3x is-large ' +
              (this.state.pending
                ? 'fa-question-circle'
                : this.state.activated
                ? 'fa-check-circle has-text-success'
                : 'fa-times-circle has-text-danger')
            }
            title="Activé"
          />
          <h1 className="is-size-3">Activation de votre compte</h1>
          <h2 className="is-size-5">
            {this.state.pending
              ? "Votre compte est en cours d'activation"
              : this.state.activated
              ? 'Votre compte a bien été activé'
              : "Votre compte n'a pas été activé"}
          </h2>
        </div>

        {this.state.activated && (
          <div className="field is-grouped is-grouped-centered">
            <p className="control">
              <Button
                to={path.login}
                className="is-success has-text-weight-semibold"
              >
                Se connecter à mon compte
              </Button>
            </p>
          </div>
        )}

        {this.state.error && (
          <Notification
            className="is-danger has-text-centered has-text-weight-semibold"
            style={{ maxWidth: '300px', margin: 'auto' }}
          >
            {this.state.error.message}
          </Notification>
        )}
      </Page>
    )
  }
}
