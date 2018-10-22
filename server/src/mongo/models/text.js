const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Text",
  new mongoose.Schema({
    created: { type: Date, default: Date.now },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    actual: { type: String, default: "" },
    patches: { type: [String], default: [] },
    commits: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    updated: { type: Date, default: Date.now }
  })
);
