/*
============================================
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 27 November 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: Role model
===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let roleSchema = new Schema({
  /*  role: { type: String, default: "standard" },*/
  text: { type: String, unique: true },
  isDisabled: { type: Boolean, default: false },
});

const RoleDocument = mongoose.model("Role", roleSchema);

module.exports = {
  roleSchema,
  RoleDocument,
};
