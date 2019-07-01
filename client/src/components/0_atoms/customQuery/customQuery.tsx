import { Query } from 'react-apollo'
import React from 'react'

export const CustomQuery = (props: any) => (
  <Query {...props}>
    {({ loading, error, data }: any) => {
      if (loading) {
        console.log('Data is loading....')
      }
      if (error) {
        console.error(`Something went wrong : ${error}`)
      }
      return props.children(data)
    }}
  </Query>
)
