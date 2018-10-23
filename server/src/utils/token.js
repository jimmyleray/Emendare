const crypto = require("crypto");

module.exports = () => {
  const buffer = crypto.randomBytes(256);
  return buffer.toString("hex");
};
