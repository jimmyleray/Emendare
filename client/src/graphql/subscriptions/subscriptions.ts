import { gql } from 'apollo-boost'

export const NEW_EVENT = gql`
  subscription {
    newEvent {
      data {
        id
        created
        target {
          id
          type
          created
        }
      }
    }
  }
`

export const DELETE_EVENT = gql`
  subscription {
    deleteEvent {
      data {
        id
      }
    }
  }
`
