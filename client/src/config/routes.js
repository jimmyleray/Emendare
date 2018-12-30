const withID = path => (id = ':id') => path + id

export const routes = {
  home: { path: '/', exact: true },
  news: { path: '/actualites' },
  explore: { path: '/explorer' },
  group: { path: withID('/groupe/') },
  login: { path: '/connexion' },
  subscribe: { path: '/inscription' },
  profile: { path: '/profil', private: true },
  text: { path: withID('/texte/') },
  edit: { path: withID('/editer/'), private: true },
  amend: { path: withID('/amendement/') }
}

export const path = Object.keys(routes).reduce(
  (acc, key) => ({ ...acc, [key]: routes[key].path }),
  {}
)
