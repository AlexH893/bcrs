const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lineItemSchema = new Schema({
    title: { type: String },
    price: { type: Number }
})

module.exports = lineItemSchema; 