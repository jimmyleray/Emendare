import { withRouter } from 'next/router'
import { Page } from '../components'

const Text = () => (
  <Page pageName="Texte">
    <p>Text page</p>
  </Page>
)

export default withRouter(Text)
