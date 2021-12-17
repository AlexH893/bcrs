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
const lineItemDocument = require("../models/line-item");

let invoiceSchema = new Schema(
  {
    lineItems: [lineItemDocument],
    partsAmount: { type: Number },
    laborAmount: { type: Number },
    lineItemTotal: { type: Number },
    total: { type: Number },
    username: { type: String },
    orderDate: { type: Date }
  }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
