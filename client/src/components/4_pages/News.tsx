/* eslint-disable sonarjs/cognitive-complexity */
/*
 * Page d'actualités
 * Le but de cette page est de permettre aux utilisateurs :
 * - de visualiser les dernières actualités de la plateforme
 * - d'accéder rapidement aux pages ciblées par les actualités
 */

import React from 'react'
import { Button, Buttons, Event, DataContext, Icon, Page, ErrorPage } from '..'

const light = 'has-text-light'
const dark = 'has-text-dark'

interface INewsPageState {
  displayGroupEvents: boolean
  displayTextEvents: boolean
  displayAmendEvents: boolean
  displayResultEvents: boolean
}

export class NewsPage extends React.Component<{}, INewsPageState> {
  private toggle: any

  constructor(props: any) {
    super(props)

    this.toggle = (name: string) => () => {
      this.setState({ [name]: !(this.state as any)[name] } as any)
    }

    this.state = {
      displayGroupEvents: true,
      displayTextEvents: true,
      displayAmendEvents: true,
      displayResultEvents: true
    }
  }

  public render() {
    return (
      <Page title="Actualités">
        <DataContext.Consumer>
          {({ get }) => {
            const events = get('events')('all')

            if (events) {
              if (events.error) {
                return <ErrorPage error={events.error} />
              } else if (events.data) {
                return (
                  <>
                    <div className="has-text-centered">
                      <p className="is-size-3">Fil d'actualités en direct</p>
                      <p className="is-size-5">
                        Vous pouvez filtrer par type d'actualités
                      </p>
                    </div>
                    <br />
                    <Buttons style={{ display: 'flex' }}>
                      <Button
                        className={
                          this.state.displayGroupEvents
                            ? 'is-danger'
                            : 'is-light'
                        }
                        onClick={this.toggle('displayGroupEvents')}
                        style={{ flex: 1 }}
                      >
                        <Icon
                          type="fas fa-users"
                          className={
                            this.state.displayGroupEvents ? light : dark
                          }
                        />{' '}
                        <span>Groupe</span>
                      </Button>
                      <Button
                        className={
                          this.state.displayTextEvents ? 'is-info' : 'is-light'
                        }
                        onClick={this.toggle('displayTextEvents')}
                        style={{ flex: 1 }}
                      >
                        <Icon
                          type="fas fa-align-center"
                          className={
                            this.state.displayTextEvents ? light : dark
                          }
                        />{' '}
                        <span>Texte</span>
                      </Button>
                      <Button
                        className={
                          this.state.displayAmendEvents
                            ? 'is-primary'
                            : 'is-light'
                        }
                        onClick={this.toggle('displayAmendEvents')}
                        style={{ flex: 1 }}
                      >
                        <Icon
                          type="far fa-comment-alt"
                          className={
                            this.state.displayAmendEvents ? light : dark
                          }
                        />{' '}
                        <span>Amendement</span>
                      </Button>
                      <Button
                        className={
                          this.state.displayResultEvents
                            ? 'is-success'
                            : 'is-light'
                        }
                        onClick={this.toggle('displayResultEvents')}
                        style={{ flex: 1 }}
                      >
                        <Icon
                          type="fas fa-poll"
                          className={
                            this.state.displayResultEvents ? light : dark
                          }
                        />{' '}
                        <span>Résultat</span>
                      </Button>
                    </Buttons>
                    <hr />
                    <div>
                      {events.data
                        .filter((event: any) =>
                          event.targetType === 'group'
                            ? this.state.displayGroupEvents
                            : true
                        )
                        .filter((event: any) =>
                          event.targetType === 'text'
                            ? this.state.displayTextEvents
                            : true
                        )
                        .filter((event: any) =>
                          event.targetType === 'amend'
                            ? this.state.displayAmendEvents
                            : true
                        )
                        .filter((event: any) =>
                          event.targetType === 'result'
                            ? this.state.displayResultEvents
                            : true
                        )
                        .map((event: any) => {
                          return <Event key={event._id} data={event} />
                        })}
                    </div>
                  </>
                )
              }
            }
          }}
        </DataContext.Consumer>
      </Page>
    )
  }
}
