const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Group",
  new mongoose.Schema({
    created: { type: Date, default: Date.now },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    subgroups: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    updated: { type: Date, default: Date.now }
  })
);
