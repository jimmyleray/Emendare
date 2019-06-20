const devClientUrl = 'http://localhost:3000/'
const devInstanceUrl = 'http://localhost:3030/'
const devRegisterUrl = 'http://localhost:3003/'
const devMongoHost = 'mongodb://localhost:27017/emendare'
const officialRegisterUrl = 'https://emendare-register.cleverapps.io/'

export default {
  instance: {
    name: process.env.INSTANCE_NAME || 'Dev instance',
    description:
      process.env.INSTANCE_DESCRIPTION || 'Instance for development purposes',
    language: process.env.INSTANCE_LANGUAGE || 'FR',
    instanceUrl: process.env.INSTANCE_URL || devInstanceUrl,
    private: process.env.INSTANCE_URL || false
  },
  registerUrl:
    process.env.REGISTER_URL || process.env.NODE_ENV === 'production'
      ? officialRegisterUrl
      : devRegisterUrl,
  contributions: {
    apiUrl: 'https://api.github.com/repos/jimmyleray/Emendare/contributors',
    listPlugins: [
      'fossabot',
      'code-factor',
      'ImgBotApp',
      'dependabot-bot',
      'renovate-bot',
      'greenkeeper[bot]'
    ]
  },
  mongoHost: process.env.MONGODB_ADDON_URI || devMongoHost,
  port: Number(process.env.PORT) || 3030,
  clientUrl: process.env.CLIENT_URL || devClientUrl,
  jwt: {
    expire: 7 * 24 * 60 * 60 * 1000,
    secret: process.env.JWT_SECRET || 'theSecret'
  }
}
