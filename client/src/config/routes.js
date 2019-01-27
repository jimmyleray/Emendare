// For paths like that for example : /text/:id
const withID = path => (id = ':id') => path + id

// All application routes
export const routes = [
  { name: 'home', path: '/', exact: true },
  { name: 'news', path: '/actualites' },
  { name: 'code', path: '/charte-ethique' },
  { name: 'legal', path: '/mentions-legales' },
  { name: 'contributors', path: '/contributeurs' },
  { name: 'group', path: withID('/groupe/') },
  { name: 'login', path: '/connexion' },
  { name: 'subscribe', path: '/inscription' },
  { name: 'profile', path: '/profil', private: true },
  { name: 'text', path: withID('/texte/') },
  { name: 'edit', path: withID('/editer/'), private: true },
  { name: 'amend', path: withID('/amendement/') },
  { name: 'activate', path: withID('/activation/') }
]

// To be use like that : path.text("42") => /text/42
export const path = routes.reduce(
  (acc, route) => ({ ...acc, [route.name]: route.path }),
  {}
)
