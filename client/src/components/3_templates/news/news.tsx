/* eslint-disable sonarjs/cognitive-complexity */

import React from 'react'
import {
  Button,
  Buttons,
  Divider,
  Event,
  DataContext,
  UserContext,
  Icon
} from '../../../components'
import { Socket } from '../../../services'
import { IEvent } from '../../../../../interfaces'
import { I18nContext } from '../../5_contexts'

interface INewsState {
  displayTextEvents: boolean
  displayAmendEvents: boolean
  displayResultEvents: boolean
}

export class News extends React.Component<{}, INewsState> {
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
      <I18nContext.Consumer>
        {({ translate }) => (
          <UserContext.Consumer>
            {({ user }) => {
              const lastEventDate =
                user && new Date(user.lastEventDate).getTime()
              return (
                <DataContext.Consumer>
                  {({ get }) => {
                    const events = get('events')('all')

                    if (events && events.data) {
                      const newEventsCount = user
                        ? events.data.filter(
                            (event: any) =>
                              new Date(event.created).getTime() >
                              new Date(user.lastEventDate).getTime()
                          ).length
                        : 0

                      return (
                        <React.Fragment>
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
                              <span>{translate('TEXT')}</span>
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
                              <span>{translate('AMEND')}</span>
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
                              <Icon type="fas fa-poll" />{' '}
                              <span>{translate('RESULT')}</span>
                            </Button>
                          </Buttons>

                          <Divider
                            content={
                              newEventsCount > 0
                                ? translate('NEW_EVENTS')
                                : translate('EVENTS_LIST')
                            }
                          />

                          {newEventsCount > 0 && (
                            <Button
                              className="is-fullwidth is-dark is-outlined"
                              style={{ marginBottom: '4px' }}
                              onClick={this.updateLastEventDate}
                            >
                              {translate('MARK_AS_READ')}
                            </Button>
                          )}

                          <div>
                            {events.data
                              .filter((event: IEvent) =>
                                event.target.type === 'text'
                                  ? this.state.displayTextEvents
                                  : true
                              )
                              .filter((event: IEvent) =>
                                event.target.type === 'amend'
                                  ? this.state.displayAmendEvents
                                  : true
                              )
                              .filter((event: IEvent) =>
                                event.target.type === 'result'
                                  ? this.state.displayResultEvents
                                  : true
                              )
                              .map(
                                (
                                  event: IEvent,
                                  index: number,
                                  array: any[]
                                ) => {
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
                                            <Divider
                                              content={translate('OLD_EVENTS')}
                                            />
                                          ))}
                                    </div>
                                  )
                                }
                              )}
                          </div>
                        </React.Fragment>
                      )
                    }
                  }}
                </DataContext.Consumer>
              )
            }}
          </UserContext.Consumer>
        )}
      </I18nContext.Consumer>
    )
  }
}
