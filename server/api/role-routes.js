/*
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 3 Dec 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: Session-Routes
; Sources: Getting MEAN with Mongo, Express, Angular, and Node, Second Edition,
*/

var express = require("express");
const router = express.Router();
const BaseResponse = require("../models/base-response.js");
const ErrorResponse = require("../models/error-response");
const Role = require("../models/role.js");

router.post("/", async (req, res) => {
  try {
    Role.findOne({ text: req.body.text }, function (err, role) {
      if (err) {
        console.log(err);
        const findRoleMongodbError = new ErrorResponse(
          500,
          "Internal server error",
          err
        );
        res.status(500).send(findRoleMongodbError.toObject());
      } else {
        console.log(role);

        if (!role) {
          const newRole = {
            text: req.body.text,
          };

          Role.create(newRole, function (err, role) {
            if (err) {
              console.log(err);
              const createRoleMongodbErrorResponse = new ErrorResponse(
                "500",
                "Interna; server error",
                err
              );
              res.status(500).send(createRoleMongodbErrorResponse.toObject());
            } else {
              console.log(role);
              const createRoleResponse = new BaseResponse(
                "200",
                "Query success",
                role
              );
              res.json(createRoleResponse.toObject());
            }
          });
        } else {
          console.log(`Role: ${req.body.text} already exists!`);
          const roleAlreadyExists = new ErrorResponse(
            400,
            `Role '${req.body.text}' already exists!`
          );
          res.status(400).send(roleAlreadyExists.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);
    const createRoleCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(createRoleCatchErrorResponse.toObject());
  }
});
