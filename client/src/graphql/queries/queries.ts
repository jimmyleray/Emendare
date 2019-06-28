import { gql } from 'apollo-boost'

export const GET_EVENTS = gql`
  query {
    events {
      data
      error {
        message
        code
      }
    }
  }
`
