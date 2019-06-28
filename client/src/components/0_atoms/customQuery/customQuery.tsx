import { Query } from 'react-apollo'

export const CustomQuery = (props: any) => (
  <Query {...props}>
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
  </Query>
)
