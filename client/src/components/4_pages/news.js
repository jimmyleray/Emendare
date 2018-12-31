/*
 * Page d'actualités
 * Le but de cette page est de permettre aux utilisateurs :
 * - de visualiser les dernières actualités de la plateforme
 * - d'accéder rapidement aux pages ciblées par les actualités
 */

import React from 'react'
import { Button, Buttons, Event, EventsContext, Page } from '../../components'

export class NewsPage extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = name => () => {
      this.setState({ [name]: !this.state[name] })
    }

    this.state = {
      displayGroupEvents: true,
      displayTextEvents: true,
      displayAmendEvents: true
    }
  }

  render() {
    return (
      <Page title="Actualités">
        <EventsContext.Consumer>
          {({ events }) => (
            <>
              <div className="has-text-centered">
                <p className="is-size-3">Fil d'actualités en direct</p>
                <p className="is-size-5">
                  Vous pouvez filtrer par type d'actualité
                </p>
              </div>
              <br />
              <Buttons style={{ display: 'flex' }}>
                <Button
                  className={
                    this.state.displayGroupEvents ? 'is-danger' : 'is-light'
                  }
                  onClick={this.toggle('displayGroupEvents')}
                  style={{ flex: 1 }}
                >
                  Groupe
                </Button>
                <Button
                  className={
                    this.state.displayTextEvents ? 'is-warning' : 'is-light'
                  }
                  onClick={this.toggle('displayTextEvents')}
                  style={{ flex: 1 }}
                >
                  Texte
                </Button>
                <Button
                  className={
                    this.state.displayAmendEvents ? 'is-info' : 'is-light'
                  }
                  onClick={this.toggle('displayAmendEvents')}
                  style={{ flex: 1 }}
                >
                  Amendement
                </Button>
              </Buttons>
              <hr />
              <div className="has-text-centered">
                {events &&
                  events
                    .filter(event =>
                      event.targetType === 'group'
                        ? this.state.displayGroupEvents
                        : true
                    )
                    .filter(event =>
                      event.targetType === 'text'
                        ? this.state.displayTextEvents
                        : true
                    )
                    .filter(event =>
                      event.targetType === 'amend'
                        ? this.state.displayAmendEvents
                        : true
                    )
                    .map(event => <Event key={event._id} data={event} />)}
              </div>
            </>
          )}
        </EventsContext.Consumer>
      </Page>
    )
  }
}
