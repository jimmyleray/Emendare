export default {
  contributions:
    'https://github.com/jimmyleray/Emendare/graphs/contributors-data.json',
  mongoHost:
    process.env.MONGODB_ADDON_URI || 'mongodb://localhost:27017/emendare',
  port: Number(process.env.PORT) || 3030,
  myUrl: process.env.MY_URL || 'http://localhost:3030'
}
