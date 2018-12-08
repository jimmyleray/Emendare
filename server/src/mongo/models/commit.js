const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Commit",
  new mongoose.Schema({
    created: { type: Date, default: Date.now },
    whitelist: { type: [String], default: [] },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    patch: { type: String, required: true },
    text: { type: mongoose.Schema.Types.ObjectId, ref: "Text", required: true },
    updated: { type: Date, default: Date.now }
  })
);
