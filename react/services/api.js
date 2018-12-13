const config = {
  url: {
    development: 'http://localhost:3000',
    production: 'https://emendare-api.cleverapps.io'
  }
}
export class Api {
  static call(pathname) {
    return config.url[process.env.NODE_ENV] + pathname
  }
}
