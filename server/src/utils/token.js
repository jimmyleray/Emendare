const crypto = require("crypto");

module.exports = () => {
  const buffer = crypto.randomBytes(48);
  return buffer.toString("hex");
};
