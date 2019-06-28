import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'

// Create an httpLink
export const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL || 'http://localhost:3030/graphql'
})

// Create an websocket link
export const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3030/graphql',
  options: {
    reconnect: true
  }
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

// Create the client
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})
