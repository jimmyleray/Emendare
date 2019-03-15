/* eslint-disable sonarjs/cognitive-complexity */

import React from 'react'
import {
  Button,
  Divider,
  DataContext,
  UserContext,
  NewsList
} from '../../../components'
import { Socket } from '../../../services'
import { I18nContext } from '../../5_contexts'

export const News = () => {
  const updateLastEventDate = () => {
    Socket.emit('updateLastEventDate')
  }

  return (
    <I18nContext.Consumer>
      {({ translate }) => (
        <UserContext.Consumer>
          {({ user }) => {
            const lastEventDate = user && new Date(user.lastEventDate).getTime()
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
                            onClick={updateLastEventDate}
                          >
                            {translate('MARK_AS_READ')}
                          </Button>
                        )}
                        <NewsList
                          events={events.data}
                          lastEventDate={lastEventDate}
                          newEventsCount={newEventsCount}
                        />
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
