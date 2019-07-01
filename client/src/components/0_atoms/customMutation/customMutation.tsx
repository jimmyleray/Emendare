import { Mutation } from 'react-apollo'
import React from 'react'

export const CustomMutation = (props: any) => (
  <Mutation {...props}>
    {({ loading, error, data }: any) => {
      if (loading) {
        console.log('Data is loading....')
      }
      if (error) {
        console.error(`Something went wrong : ${error}`)
      }
      return props.children(data)
    }}
  </Mutation>
)
