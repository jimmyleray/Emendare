const apiConfig = require('../config/api.json')

export const api = pathname =>
  (location.origin === 'http://localhost:8080'
    ? apiConfig.dev
    : apiConfig.prod) + pathname
