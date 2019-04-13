import { IRoute } from '../../../../interfaces'

// For paths like that for example : /text/:id
export const withID = (pathname: string) => (id = ':id') => pathname + id

// All application routes
export const routes: IRoute[] = [
  { name: 'home', path: '/', exact: true },
  { name: 'code', path: '/ethics-code' },
  { name: 'explore', path: '/explore' },
  { name: 'news', path: '/news' },
  { name: 'legal', path: '/legal-notice' },
  { name: 'contributors', path: '/contributors' },
  { name: 'login', path: '/login' },
  { name: 'reset', path: '/reset-password' },
  { name: 'subscribe', path: '/register' },
  { name: 'profile', path: '/profile', private: true },
  { name: 'create', path: '/create', private: true },
  { name: 'text', path: withID('/text/') },
  { name: 'edit', path: withID('/edit/'), private: true },
  { name: 'amend', path: withID('/amend/') },
  { name: 'activate', path: withID('/activate/') },
  { name: 'share', path: withID('/share/') }
]

// To be use like that : path.text("42") => /text/42
export const path: any = routes.reduce(
  (acc, route) => ({ ...acc, [route.name]: route.path }),
  {}
)
