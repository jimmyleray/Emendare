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
  private updateLastEventDate: any

  constructor(props: any) {
    super(props)

    this.updateLastEventDate = () => {
      Socket.emit('updateLastEventDate')
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
                          <Divider
                            content={
                              newEventsCount > 0
                                ? translate('NEW_EVENTS')
                                : translate('EVENTS_LIST')
                            }
                          />

                          {newEventsCount > 0 && (
                            <Button
                              className="is-fullwidth is-dark "
                              style={{
                                marginBottom: '1.5rem'
                              }}
                              onClick={this.updateLastEventDate}
                            >
                              {translate('MARK_AS_READ')}
                            </Button>
                          )}

                          <div>
                            {events.data.map(
                              (event: IEvent, index: number, array: any[]) => {
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
