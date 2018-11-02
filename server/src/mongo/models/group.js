const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Group",
  new mongoose.Schema({
    created: { type: Date, default: Date.now },
    owners: { type: [mongoose.Schema.Types.ObjectId], required: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    subgroups: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    parent: { type: mongoose.Schema.Types.ObjectId, default: null },
    whitelist: { type: [String], default: [] },
    private: { type: Boolean, default: false },
    official: { type: Boolean, default: false },
    updated: { type: Date, default: Date.now }
  })
);
