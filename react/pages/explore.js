import { withRouter } from 'next/router'
import { Page } from '../components'

const Explore = () => (
  <Page pageName="Explorer">
    <p>Explore page</p>
  </Page>
)

export default withRouter(Explore)
