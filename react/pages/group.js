import { withRouter } from 'next/router'
import { Page } from '../components'

const Group = () => (
  <Page pageName="Groupe">
    <p>Group page</p>
  </Page>
)

export default withRouter(Group)
