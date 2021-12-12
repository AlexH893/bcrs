/*
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 12 Dec 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: Invoice-Routes
; Sources: Getting MEAN with Mongo, Express, Angular, and Node, Second Edition,
*/

var express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Question = require("../models/security-questions.js");
const bcrypt = require("bcrypt");
const Role = "../models/role.js";

/*
 * createInvoice API
 */

router.post("/:userName", async (req, res) => {
  try {
    const newInvoice = {
      userName: req.params.userName,
      lineItems: req.body.lineItems,
      partsAmount: req.body.partsAmount,
      laborAmount: req.body.laborAmount,
      lineItemTotal: req.body.lineItemTotal,
      total: req.body.total,
    };

    console.log(newInvoice);
    Invoice.create(newInvoice, function (err, invoice) {
      if (err) {
        console.log(err);
        const createInvoiceMongodbErrorResponse = new ErrorResponse(
          "500",
          "internal server error",
          err
        );
        res.status(500).send(createInvoiceMongodbErrorResponse.toObject());
      } else {
        console.log(invoice);
        const createInvoiceResponse = new BaseResponse(
          "200",
          "query successful",
          invoice
        );
        res.json(createInvoiceResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const createInvoiceCatchErrorResponse = new ErrorResponse(
      "500",
      "internal server",
      e.message
    );
    res.status(500).send(createInvoiceCatchErrorResponse.toObject());
  }
});
