import { IRoute } from '../../../../interfaces'

// For paths like that for example : /text/:id
export const withID = (pathname: string) => (id = ':id') => pathname + id

// All application routes
export const routes: IRoute[] = [
  { name: 'home', path: '/', exact: true },
  { name: 'code', path: '/ethics-code' },
  { name: 'texts', path: '/texts' },
  { name: 'votes', path: '/votes' },
  { name: 'results', path: '/results' },
  { name: 'legal', path: '/legal-notice' },
  { name: 'contributors', path: '/contributors' },
  { name: 'reset', path: '/reset-password' },
  { name: 'profile', path: '/profile', private: true },
  { name: 'create', path: '/create', private: true },
  { name: 'edit', path: withID('/edit/'), private: true },
  { name: 'activate', path: withID('/activate/') },
  { name: 'share', path: withID('/share/') },
  { name: 'authentification', path: '/authentification' }
]

// To be use like that : path.text("42") => /text/42
export const path: any = routes.reduce(
  (acc, route) => ({ ...acc, [route.name]: route.path }),
  {}
)
