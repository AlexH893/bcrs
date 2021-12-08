/*
============================================
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 27 November 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: Invoice
===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { lineItemsSchema } = require("");

let invoiceSchema = new Schema(
  {
    lineItems: [lineItemsSchema],
    partsAmount: { type: Number },
    laborAmount: { type: Number },
    lineItemTotal: { type: Number },
    total: { type: Number },
    username: { type: String },
    orderDate: { type: Date }
  }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
