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

const roleSchema = new Schema({
  text: { type: String, unique: true },
  isDisabled: { type: Boolean, default: false },
});

module.exports = mongoose.model("Role", roleSchema);
