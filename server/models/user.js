/*
============================================
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 27 November 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: Users
===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { questionSchema } = require("./security-questions");
const userRoleSchema = require("./user-role");

let userSchema = new Schema(
  {
    //Unique:true is to ensure that indexed fields don't store duplicate values
    /*userId: { type: Number, unique: true, dropdups: true },*/
    userName: { type: String },
    password: { type: String },
    phoneNum: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    email: { type: String },
    isDisabled: { type: Boolean, required: true, default: false },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role"
    },
    securityQuestions: [new Schema({
      answer: { type: String } /* The question answer */,
      question: {
        type: Schema.Types.ObjectId,
        ref: "SecurityQuestions"
      }
    })],
    date_created: { type: Date },
    date_modified: { type: Date },
    /*invoice: [InvoiceDocument]  Needs created */
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", userSchema);
