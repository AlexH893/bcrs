/*
============================================
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 27 November 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: Security Questions
===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let questionSchema = new Schema(
  {
    text: { type: String } /* The text of the question */,
    answer: { type: String } /* The question answer */,
    isDisabled: { type: Boolean },
  },
  { collection: "users" }
);

module.exports = questionSchema;
