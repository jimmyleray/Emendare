/* eslint-disable sonarjs/cognitive-complexity */
/*
 * Page d'actualités
 * Le but de cette page est de permettre aux utilisateurs :
 * - de visualiser les dernières actualités de la plateforme
 * - d'accéder rapidement aux pages ciblées par les actualités
 */

import React from 'react'
import {
  Hero,
  Button,
  Buttons,
  Divider,
  Event,
  DataContext,
  UserContext,
  Icon,
  Page,
  ErrorPage
} from '../../../components'
import { Socket } from '../../../services'

interface INewsPageState {
  displayTextEvents: boolean
  displayAmendEvents: boolean
  displayResultEvents: boolean
}

export class NewsPage extends React.Component<{}, INewsPageState> {
  private toggle: any
  private updateLastEventDate: any

  constructor(props: any) {
    super(props)

    this.toggle = (name: string) => () => {
      this.setState(
        prevState =>
          ({ ...prevState, [name]: !(prevState as any)[name] } as any)
      )
    }

    this.updateLastEventDate = () => {
      Socket.emit('updateLastEventDate')
    }

    this.state = {
      displayTextEvents: true,
      displayAmendEvents: true,
      displayResultEvents: true
    }
  }

  public render() {
    return (
      <Page title="Actualités">
        <UserContext.Consumer>
          {({ user }) => {
            const lastEventDate = user && new Date(user.lastEventDate).getTime()
            return (
              <DataContext.Consumer>
                {({ get }) => {
                  const events = get('events')('all')

                  if (events) {
                    if (events.error) {
                      return <ErrorPage error={events.error} />
                    } else if (events.data) {
                      const newEventsCount = user
                        ? events.data.filter(
                            (event: any) =>
                              new Date(event.created).getTime() >
                              new Date(user.lastEventDate).getTime()
                          ).length
                        : 0

                      return (
                        <>
                          <Hero
                            title="Fil d'actualités"
                            subtitle="Vous pouvez filtrer par type d'actualités"
                          />
                          <Buttons style={{ display: 'flex', marginBottom: 0 }}>
                            <Button
                              className={
                                this.state.displayTextEvents
                                  ? 'is-info'
                                  : 'is-light'
                              }
                              onClick={this.toggle('displayTextEvents')}
                              style={{ flex: 1 }}
                            >
                              <Icon type="fas fa-align-center" />{' '}
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
                              <Icon type="far fa-comment-alt" />{' '}
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
                              <Icon type="fas fa-poll" /> <span>Résultat</span>
                            </Button>
                          </Buttons>

                          <Divider
                            content={
                              newEventsCount > 0
                                ? 'Nouveaux évènements'
                                : 'Liste des évènements'
                            }
                          />

                          {newEventsCount > 0 && (
                            <Button
                              className="is-fullwidth is-dark is-outlined"
                              style={{ marginBottom: '4px' }}
                              onClick={this.updateLastEventDate}
                            >
                              Tout marquer comme lu
                            </Button>
                          )}

                          <div>
                            {events.data
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
                              .map(
                                (event: any, index: number, array: any[]) => {
                                  return (
                                    <div
                                      key={event._id}
                                      style={{ marginBottom: '4px' }}
                                    >
                                      <Event data={event} />
                                      {lastEventDate &&
                                        newEventsCount > 0 &&
                                        (new Date(event.created).getTime() >
                                          lastEventDate &&
                                          array[index + 1] &&
                                          new Date(
                                            array[index + 1].created
                                          ).getTime() < lastEventDate && (
                                            <Divider content="Anciens évènements" />
                                          ))}
                                    </div>
                                  )
                                }
                              )}
                          </div>
                        </>
                      )
                    }
                  }
                }}
              </DataContext.Consumer>
            )
          }}
        </UserContext.Consumer>
      </Page>
    )
  }
}
