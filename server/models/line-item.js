/*
 * Author: Professor Krasso
 * Modified by: Alex Haefner
 * Date: 11.10.2021
 * Description: Line item model
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lineItemSchema = new Schema({
  title: { type: String },
  price: { type: Number },
});

module.exports = lineItemSchema;
