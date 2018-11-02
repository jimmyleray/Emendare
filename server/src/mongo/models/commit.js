const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Commit",
  new mongoose.Schema({
    created: { type: Date, default: Date.now },
    owners: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      required: true
    },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    patch: { type: String, required: true },
    text: { type: mongoose.Schema.Types.ObjectId, ref: "Text", required: true },
    updated: { type: Date, default: Date.now }
  })
);
