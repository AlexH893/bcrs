/*
 * Modified by: Alex Haefner
 * Date: 11.22.2021
 * Description: Security questions model
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let questionSchema = new Schema(
  {
    /*questionId: { type: Number },*/
    text: { type: String } /* The text of the question */,
    answer: { type: String } /* The question answer */,
    isDisabled: { type: Boolean },
  },
  { collection: "users" }
);

module.exports = questionSchema;
