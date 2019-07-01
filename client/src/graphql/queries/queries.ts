import { gql } from 'apollo-boost'

export const GET_EVENTS = gql`
  query($limit: Int, $lastEventDate: String) {
    events(limit: $limit, lastEventDate: $lastEventDate) {
      data {
        events {
          id
          created
          target {
            type
            id
          }
        }
        hasNextPage
      }
      error {
        message
        code
      }
    }
  }
`
