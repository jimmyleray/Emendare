import { withRouter } from 'next/router'
import { Page } from '../components'

const Login = () => (
  <Page pageName="Connexion">
    <p>Login page</p>
  </Page>
)

export default withRouter(Login)
