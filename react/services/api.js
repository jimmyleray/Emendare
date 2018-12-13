const config = {
  url: {
    development: 'http://localhost:3000',
    production: 'https://emendare-api.cleverapps.io'
  }
}

export const api = pathname => config.url[process.env.NODE_ENV] + pathname
