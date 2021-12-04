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

        const registerUserMongodbErrorResponse = new ErrorRespons(
          "500",
          "Internal server error",
          err
        );
        res.status(500).send(registerUserMongodbErrorResponse.toObject());
      } else {
        if (!user) {
          const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
          standardRole = {
            role: "standard",
          };

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
                "Query succesfull",
                newUser
              );
              res.json(registeredUserResponse.toObject());
            }
          });
        }
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

module.exports = router;
