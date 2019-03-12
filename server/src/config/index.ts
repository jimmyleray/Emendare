export default {
  contributions:
    'https://github.com/jimmyleray/Emendare/graphs/contributors-data.json',
  mongoHost:
    process.env.MONGODB_ADDON_URI || 'mongodb://localhost:27017/emendare',
  port: Number(process.env.PORT) || 3030,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  jwt: {
    expire: 60 * 60 * 1000,
    secret: process.env.JWT_SECRET || 'VGhpczE1YXMzY3Jla2V5IQ=='
  }
}
