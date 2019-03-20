import React, { useEffect, useReducer, useContext } from 'react'
import { Socket } from '../../../services'
import { IError, IEvent } from '../../../../../interfaces'
import _ from 'lodash'
import { UserContext } from '../user'
import { getNewEvent, deleteNewEvent } from './helper'

interface IEventProviderProps {
  /** Children nodes */
  children: React.ReactChild
}

interface IEventProviderState {
  error: any
  events: Array<IEvent>
  hasNextPage: boolean
  newEvents: Array<IEvent>
  dispatch: any
}

const initialState: IEventProviderState = {
  events: new Array<IEvent>(),
  hasNextPage: true,
  error: undefined,
  newEvents: [],
  dispatch: () => {
    return
  }
}

export const EventsContext = React.createContext(initialState)

export const EventsProvider = ({ children }: IEventProviderProps) => {
  const { user } = useContext(UserContext)
  // Reducer function
  const reducer = (
    state: IEventProviderState,
    action: { type: string; payload: any }
  ): IEventProviderState => {
    switch (action.type) {
      case 'ADD_NEW_EVENTS':
        const events = [...state.events]
        const newEvents = [...state.newEvents]
        events.unshift(action.payload.events)
        newEvents.push(action.payload.events)
        return {
          ...state,
          error: action.payload.error,
          events: _.uniqBy(events, '_id'),
          newEvents: _.uniqBy(newEvents, '_id')
        }
      case 'ADD_OLD_EVENTS':
        const listEvents = _.uniqBy(
          _.concat(state.events, action.payload.events),
          '_id'
        )
        return {
          ...state,
          error: action.payload.error,
          hasNextPage: action.payload.hasNextPage,
          events: listEvents,
          newEvents: getNewEvent(action.payload.lastEventDate, listEvents)
        }
      case 'NEW_EVENTS_READED':
        Socket.emit('updateLastEventDate')
        return {
          ...state,
          newEvents: []
        }
      case 'NEW_EVENT_READED':
        Socket.emit('updateLastEventDate')
        return {
          ...state,
          newEvents: deleteNewEvent(action.payload.eventId, state.newEvents)
        }
      default:
        return state
    }
  }

  // Initialization of the state
  const [state, dispatch] = useReducer(reducer, initialState)

  // listen socket events
  useEffect(() => {
    Socket.on(
      'events',
      ({
        error,
        data
      }: {
        error: IError
        data: { events: IEvent[]; hasNextPage: boolean }
      }) => {
        dispatch({
          type: 'ADD_OLD_EVENTS',
          payload: {
            error: error,
            events: data.events,
            hasNextPage: data.hasNextPage,
            lastEventDate: user ? user.lastEventDate : null
          }
        })
      }
    )
    if (user) {
      Socket.on(
        'events/new',
        ({ error, data }: { error: IError; data: IEvent }) => {
          dispatch({
            type: 'ADD_NEW_EVENTS',
            payload: {
              error: error,
              events: data
            }
          })
        }
      )
      return () => {
        Socket.off('events')
        Socket.off('events/new')
      }
    }
  }, [user])

  return (
    <EventsContext.Provider
      value={{
        events: state.events,
        hasNextPage: state.hasNextPage,
        error: state.error,
        newEvents: state.newEvents,
        dispatch
      }}
    >
      {children}
    </EventsContext.Provider>
  )
}
