/*
 * Modified by: Alex Haefner
 * Date: 11.22.2021
 * Description: Security questions model
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let questionSchema = new Schema({
  questionId: { type: Number },
  questionText: { type: String } /* The text of the question */,
  questionAnswer: { type: String } /* The question answer */,
});

module.exports = questionSchema;
