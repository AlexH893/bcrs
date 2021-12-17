/*
============================================
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 27 November 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: line items
===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lineItemSchema = new Schema({
    title: { type: String },
    price: { type: Number }
})

module.exports = lineItemSchema;
