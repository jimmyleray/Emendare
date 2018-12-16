import { UserProvider } from '../../contexts'

export const Providers = ({ children }) => (
  <UserProvider>{children}</UserProvider>
)
