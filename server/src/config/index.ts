export default {
  instance: {
    name: process.env.INSTANCE_NAME,
    description: process.env.INSTANCE_DESCRIPTION,
    language: process.env.INSTANCE_LANGUAGE || 'FR',
    instanceUrl: process.env.INSTANCE_URL
  },
  registerUrl:
    process.env.REGISTER_URL || 'https://emendare-register.cleverapps.io/',
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
  mongoHost:
    process.env.MONGODB_ADDON_URI || 'mongodb://localhost:27017/emendare',
  port: Number(process.env.PORT) || 3030,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  jwt: {
    expire: 7 * 24 * 60 * 60 * 1000,
    secret: process.env.JWT_SECRET || 'theSecret'
  }
}
