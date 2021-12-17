/*
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 12 Dec 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: Invoice-Routes
; Sources: Getting MEAN with Mongo, Express, Angular, and Node, Second Edition,
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userRoleSchema = new Schema({
  role: { type: String, default: "standard" },
  isDisabled: { default: false },
});

module.exports = userRoleSchema;
