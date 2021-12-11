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
    text: { type: String }, /* The text ID of the question */

  },
);

let securityQuestionSchema = new Schema (
  {
    text: { type: String },
    isDisabled: { type: Boolean, default: false}
  },
  {
    collection: "securityQuestions"
  }
);


const SecurityQuestion = mongoose.model("SecurityQuestions", securityQuestionSchema);

module.exports = {
  questionSchema,
  securityQuestionSchema,
  SecurityQuestion
};


