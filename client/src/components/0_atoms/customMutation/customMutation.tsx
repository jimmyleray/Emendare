import { Mutation } from 'react-apollo'

export const CustomMutation = (props: any) => (
  <Mutation {...props}>
    {({ loading, error, data, client }: any) => {
      if (loading) {
        console.log('Data is loading....')
      }
      if (error) {
        console.error(`Something went wrong : ${error}`)
      } else {
        props.children(data, client)
      }
    }}
  </Mutation>
)
