const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Text",
  new mongoose.Schema({
    created: { type: Date, default: Date.now },
    owners: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      required: true
    },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    actual: { type: String, default: "" },
    patches: { type: [String], default: [] },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true
    },
    commits: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Commit" }],
      default: []
    },
    whitelist: { type: [String], default: [] },
    private: { type: Boolean, default: false },
    official: { type: Boolean, default: false },
    updated: { type: Date, default: Date.now }
  })
);
