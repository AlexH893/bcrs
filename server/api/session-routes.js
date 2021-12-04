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
const User = require("../models/user.js");
const Question = require("../models/security-questions.js");
const bcrypt = require("bcrypt");
const BaseResponse = require("../models/base-response.js");

/*
 * Regiser user
 */
router.post("/register", async (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const registerUserMongodbErrorResponse = new ErrorResponse(
          "500",
          "Internal server error",
          err
        );
        res.status(500).send(registerUserMongodbErrorResponse.toObject());
      } else {
        if (!user) {
          // hashing the password
          let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
          standardRole = {
            role: "standard",
          };

          // the registered user object
          let registeredUser = {
            username: req.body.username,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNum: req.body.phoneNum,
            address: req.body.address,
            isDisabled: req.body.isDisabled,
            role: standardRole,
            securityQuestions: req.body.securityQuestions,
          };

          User.create(registeredUser, function (err, newUser) {
            if (err) {
              console.log(err);
              const newUserMongodbErrorResponse = new ErrorResponse(
                "500",
                "Internal server error",
                err
              );
              res.status(500).send(newUserMongodbErrorResponse.toObject());
            } else {
              console.log(newUser);
              const registeredUserResponse = new BaseResponse(
                "200",
                "Registration successful",
                newUser
              );
              res.json(registeredUserResponse.toObject());
            }
          });
        } else {
          console.log(`Username ${req.body.userName} already exists.`);
          const userExistsError = new BaseResponse(
            "400",
            `The username '${req.body.userName}' is already in use.`,
            null
          );
          res.status(400).send(userExistsError.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);
    const registerUserCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(registerUserCatchErrorResponse.toObject());
  }
});

module.exports = router;
