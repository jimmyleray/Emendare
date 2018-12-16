import { withRouter } from 'next/router'
import { Page } from '../components'

const Profile = () => (
  <Page pageName="Profil">
    <p>Profile page</p>
  </Page>
)

export default withRouter(Profile)
