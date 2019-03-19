import React, { useState, useEffect, useMemo, useReducer } from 'react'
import { Socket } from '../../../services'
import { IError, IEvent } from '../../../../../interfaces'
import _ from 'lodash'

interface IEventProviderProps {
  /** Children nodes */
  children: React.ReactChild
}

interface IEventProviderState {
  error: any
  events: Array<IEvent>
  hasNextPage: boolean
}

const initialState: IEventProviderState = {
  events: new Array<IEvent>(),
  hasNextPage: true,
  error: undefined
}

export const EventsContext = React.createContext(initialState)

export const EventsProvider = ({ children }: IEventProviderProps) => {
  // Reducer function
  const reducer = (
    state: IEventProviderState,
    action: { type: string; payload: any }
  ): IEventProviderState => {
    switch (action.type) {
      case 'ADD_NEW_EVENTS':
        const events = [...state.events]
        events.unshift(action.payload.events)
        return {
          ...state,
          error: action.payload.error,
          events: _.uniqBy(events, '_id')
        }
      case 'ADD_OLD_EVENTS':
        return {
          ...state,
          error: action.payload.error,
          hasNextPage: action.payload.error,
          events: _.uniqBy(_.concat(state.events, action.payload.events), '_id')
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
            hasNextPage: data.hasNextPage
          }
        })
      }
    )
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
  }, [])

  return (
    <EventsContext.Provider
      value={{
        events: state.events,
        hasNextPage: state.hasNextPage,
        error: state.error
      }}
    >
      {children}
    </EventsContext.Provider>
  )
}
