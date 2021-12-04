const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let roleSchema = new Schema({
  role: { type: String, default: "standard" },
});

const RoleDocument = mongoose.model("Role", roleSchema);

module.exports = {
  roleSchema,
  RoleDocument,
};
