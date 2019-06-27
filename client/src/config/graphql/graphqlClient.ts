import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export const apolloLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL || 'http://localhost:3030'
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: apolloLink
})
