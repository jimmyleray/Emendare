export default {
  contributions:
    'https://gitlab.com/emendare/emendare/graphs/master?format=json',
  mongoHost:
    process.env.MONGODB_ADDON_URI || 'mongodb://localhost:27017/emendare',
  port: Number(process.env.PORT) || 3030
}
