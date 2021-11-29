/*
============================================
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 27 November 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: User-Routes
; Sources: Getting MEAN with Mongo, Express, Angular, and Node, Second Edition,
; https://docs.mongodb.com/manual/reference/operator/query/ne/#mongodb-query-op.-ne
; https://www.tutorialguruji.com/node-js/how-can-i-change-the-flag-in-my-mongoose-schema-based-on-the-value-of-other-field/
===========================================
*/

var express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Question = require("../models/security-questions.js");
const bcrypt = require("bcrypt");

//Create variable saltRounds with integer value of 10
const saltRounds = 10;

/*
 * Find all users API
 * The $ne operator will return all documents where isDisabled is not true
 */
router.get("/user", async (req, res) => {
  try {
    User.find({ isDisabled: { $ne: true } }, function (err, users) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(users);
        res.json(users);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

/*
 * Find user by ID
 */
router.get("/user/:id", async (req, res) => {
  try {
    User.findOne({ _id: req.params.id }, function (err, user) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(user);
        res.json(user);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

/*
 * Create user
 * In a later Sprint we will convert this API to the "register" API
 */
router.post("/user", async (req, res) => {
  try {
    // The password to be hashed
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    const newUser = {
      username: req.body.username,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNum: req.body.phoneNum,
      address: req.body.address,
      isDisabled: req.body.isDisabled,
      role: req.body.role,
      securityQuestions: req.body.securityQuestions,
      date_created: req.body.date_created,
      date_modified: req.body.date_modified,
    };

    await User.create(newUser, function (err, user) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(user);
        res.json(user);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception ${e.message}`,
    });
  }
});

/*
 * Update user
 * The password is still hashed when changed
 */

router.put("/:user/:id", async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

  try {
    User.findOne({ _id: req.params.id }, function (err, user) {
      if (err) {
        console.log(err);
        res.status(401).send({
          message: `Invalid User ID: ${err}`,
        });
      } else {
        console.log(user);

        user.set({
          username: req.body.username,
          password: hashedPassword,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNum: req.body.phoneNum,
          address: req.body.address,
          isDisabled: req.body.isDisabled,
          role: req.body.role,
          securityQuestions: req.body.securityQuestions,
          date_created: req.body.date_created,
          date_modified: req.body.date_modified,
        });

        user.save(function (err, updatedUser) {
          if (err) {
            console.log(err);

            res.json(updatedUser);
          } else {
            console.log(err);
            res.json(updatedUser);
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception:  ${e.message}`,
    });
  }
});

/*
 * Delete user
 * The delete function does not actually remove a document from the collection
 * Instead, you are setting the "isDisabled" flag to true
 */
router.delete("/:user/:id", async (req, res) => {
  try {
    User.findOne({ _id: req.params.id }, function (err, user) {
      if (err) {
        console.log(err);
        res.status(401).send({
          message: `Invalid User ID: ${err}`,
        });
      } else {
        console.log(user);

        user.set({
          isDisabled: (req.body.isDisabled = true),
        });

        user.save(function (err, updatedUser) {
          if (err) {
            console.log(err);

            res.json(updatedUser);
          } else {
            console.log(err);
            res.json(updatedUser);
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception:  ${e.message}`,
    });
  }
});

/*
 * Find all security questions of a user, searching by ID of user
 */
router.get("/:user/:id/security-questions", async (req, res) => {
  try {
    User.findOne(
      { _id: req.params.id },
      // Projections allow us to limit the amount of data that MongoDB sends to apps & specify fields to return
      "securityQuestions",
      function (err, question) {
        if (err) {
          console.log(err);
          res.status(500).send({
            message: "Internal server error:" + err.message,
          });
        } else {
          console.log(question);
          res.json(question);
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error: " + e.message);
  }
});

/*
 * Find all security questions
 */
router.get("/security-questions", async (req, res) => {
  try {
    User.findOne({}, "securityQuestions", function (err, question) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Interal server error:" + err.message,
        });
      } else {
        console.log(question);
        res.json(question);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Interal server error: " + e.message);
  }
});

/*
 * Create security question - ID of user is needed
 */
router.post("/security-questions/:id", async (req, res) => {
  try {
    // Finding an employee by ID
    User.findOne({ _id: req.params.id }, function (err, user) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Internal server error: " + err.message,
        });
      } else {
        console.log(user);

        // Creating the new question
        const newQuestion = {
          // The question text & answer is present in the request body
          text: req.body.text,
          answer: req.body.answer,
        };

        // Here we're actually pushing the new question to the array
        user.securityQuestions.push(newQuestion);

        // After that, we save the new user
        user.save(function (err, updatedUser) {
          if (err) {
            console.log(err);
            res.status(500).send({
              message: "Internal server error: " + err.message,
            });
          } else {
            console.log(updatedUser);
            res.json(updatedUser);
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Internal server error: " + e.message,
    });
  }
});

/*
 * Delete security question
 * Remove document matching the given filter (in this case it's task ID)
 * INCOMPLETE
 */

module.exports = router;
