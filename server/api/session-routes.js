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
const ErrorResponse = require("../models/error-response");
const saltRounds = 10;
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
          let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
          standardRole = {
            role: "standard",
          };

          // the registered user object
          let registeredUser = {
            userName: req.body.userName,
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
                "Internal server error.",
                err
              );
              res.status(500).send(newUserMongodbErrorResponse.toObject());
            } else {
              console.log(newUser);
              const registeredUserResponse = new BaseResponse(
                "200",
                "Registration success.",
                newUser
              );
              res.json(registeredUserResponse.toObject());
            }
          });
        } else {
          console.log(`Username ${req.body.userName} already exists!`);
          const userExistsError = new BaseResponse(
            "400",
            `Username '${req.body.userName}' is already in use!`,
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

/*
 * Verify user
 */
router.get("/verify/users/:userName", async (req, res) => {
  try {
    User.findOne({ userName: req.params.userName }, function (err, user) {
      if (user) {
        if (err) {
          console.log(err);
          const verifyUserMongodbErrorResponse = new ErrorResponse(
            "500",
            "Internal server error",
            err
          );
          res.status(500).send(verifyUserMongodbErrorResponse.toObject());
        } else {
          console.log(user);
          const verifyUserResponse = new BaseResponse(
            "200",
            "User verification successful",
            user
          );
          res.json(verifyUserResponse.toObject());
        }
      } else {
        const invalidUsernameResponse = new BaseResponse(
          "400,",
          "Invalid username",
          req.params.userName
        );
        res.status(400).send(invalidUsernameResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const verifyUserCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(verifyUserCatchErrorResponse.toObject());
  }
});

/*
 * Update password
 */
router.post("/users/:userName/reset-password", async (req, res) => {
  try {
    const password = req.body.password;

    User.findOne(
      { userName: req.params.userName },
      "userName password",
      function (err, user) {
        if (err) {
          console.log(err);
          const resetPasswordMongodbErrorResponse = new ErrorResponse(
            "500",
            "Internal server error",
            err
          );
          res.status(500).send(resetPasswordMongodbErrorResponse.toObject());
        } else {
          console.log(user);

          let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

          // Updating the password
          user.set({
            password: hashedPassword,
          });

          // Saving the user
          user.save(function (err, updatedUser) {
            if (err) {
              console.log(err);
              const updatedUserMongodbErrorResponse = new ErrorResponse(
                "500",
                "internal server error",
                err
              );
              res.status(500).send(updatedUserMongodbErrorResponse.toObject());
            } else {
              console.log(err);
              const updatedPasswordResponse = new BaseResponse(
                "200",
                "query success",
                updatedUser
              );
              res.json(updatedPasswordResponse.toObject());
            }
          });
        }
      }
    );
  } catch (e) {
    console.log(e);
    const resePasswordCatchError = new ErrorResponse(
      "500",
      "internal server error",
      e
    );
    res.status(500).send(resePasswordCatchError.toObject());
  }
});

module.exports = router;
