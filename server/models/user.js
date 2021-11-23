/*
 * Modified by: Alex Haefner
 * Date: 11.22.2021
 * Description: User model
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QuestionDocument = require("./security-questions");

let userSchema = new Schema({
  //Unique:true is to ensure that indexed fields don't store duplicate values
  userId: { type: Number, unique: true, dropdups: true },
  username: { type: String },
  password: { type: String },
  phoneNum: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  email: { type: String },
  role: { type: String },
  securityQuestions: [QuestionDocument],
  date_created: { type: Date },
  date_modified: { type: Date },
  /*invoice: [InvoiceDocument]  Needs created */,
});
