import React from 'react'
import { IError, IEvent } from '../../../../../interfaces'
import { getNewEvent, deleteNewEvent } from './helper'
import { UserContext } from '../../../components'
import { Socket } from '../../../services'
import { uniqBy } from 'lodash'

interface IEventProviderProps {
  children: React.ReactChild
}

interface IEventProviderState {
  error: any
  events: IEvent[]
  hasNextPage: boolean
  newEvents: IEvent[]
  dispatch: any
}

const initialState: IEventProviderState = {
  events: [],
  hasNextPage: true,
  error: undefined,
  newEvents: [],
  dispatch: null
}

export const EventsContext = React.createContext(initialState)

export const EventsProvider = ({ children }: IEventProviderProps) => {
  const { user } = React.useContext(UserContext)

  const reducer = (
    previousState: IEventProviderState,
    action: { type: string; payload: any }
  ): IEventProviderState => {
    switch (action.type) {
      case 'ADD_NEW_EVENTS': {
        const events = [...previousState.events]
        const newEvents = [...previousState.newEvents]

        events.unshift(action.payload.events)
        newEvents.push(action.payload.events)

        return {
          ...previousState,
          error: action.payload.error,
          events: uniqBy(events, '_id'),
          newEvents: uniqBy(newEvents, '_id')
        }
      }
      case 'ADD_OLD_EVENTS': {
        const events = uniqBy(
          [...previousState.events, ...action.payload.events],
          '_id'
        )

        return {
          ...previousState,
          error: action.payload.error,
          hasNextPage: action.payload.hasNextPage,
          events,
          newEvents: getNewEvent(action.payload.lastEventDate, events)
        }
      }
      case 'DELETE_EVENT': {
        const notSameID = (event: IEvent) =>
          event._id !== action.payload.event._id

        const events = previousState.events.filter(notSameID)
        const newEvents = previousState.newEvents.filter(notSameID)

        return {
          ...previousState,
          error: action.payload.error,
          events: uniqBy(events, '_id'),
          newEvents: uniqBy(newEvents, '_id')
        }
      }
      case 'NEW_EVENTS_READED': {
        Socket.emit('updateLastEventDate')
        return {
          ...previousState,
          newEvents: []
        }
      }
      case 'NEW_EVENT_READED': {
        Socket.emit('updateLastEventDate')
        return {
          ...previousState,
          newEvents: deleteNewEvent(
            action.payload.eventId,
            previousState.newEvents
          )
        }
      }
      default: {
        return previousState
      }
    }
  }

  // Initialization of the state
  const [state, dispatch] = React.useReducer(reducer, initialState)

  // listen socket events
  React.useEffect(() => {
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
            error,
            events: data.events,
            hasNextPage: data.hasNextPage,
            lastEventDate: user ? user.lastEventDate : null
          }
        })
      }
    )

    Socket.on(
      'events/new',
      ({ error, data }: { error: IError; data: IEvent }) => {
        dispatch({
          type: 'ADD_NEW_EVENTS',
          payload: { error, events: data }
        })
      }
    )

    Socket.on(
      'events/delete',
      ({ error, data }: { error: IError; data: IEvent }) => {
        dispatch({
          type: 'DELETE_EVENT',
          payload: { error, event: data }
        })
      }
    )

    return () => {
      Socket.off('events')
      Socket.off('events/new')
    }
  }, [])

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
