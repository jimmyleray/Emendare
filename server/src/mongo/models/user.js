const mongoose = require("mongoose");

module.exports = mongoose.model(
  "User",
  new mongoose.Schema({
    password: { type: String, required: true },
    email: { type: String, required: true },
    created: { type: Date, default: Date.now },
    token: { type: String, default: null },
    followedGroups: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    followedTexts: { type: [mongoose.Schema.Types.ObjectId], default: [] }
  })
);
