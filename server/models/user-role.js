/*
============================================
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 27 November 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: User role
===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userRoleSchema = new Schema({
  role: { type: String, default: "standard" },
  isDisabled: { default: false },
});

module.exports = userRoleSchema;
