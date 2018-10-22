module.exports = {
  port: Number(process.env.PORT) || 3000,
  mongoHost:
    process.env.MONGODB_ADDON_URI || "mongodb://localhost:27017/emendare"
};
