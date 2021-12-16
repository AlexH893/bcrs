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
const Role = "../models/role.js";
//Create variable saltRounds with integer value of 10
const saltRounds = 10;

/*
 * Find all users API
 * The $ne operator will return all documents where isDisabled is not true
 */
router.get("/users", async (req, res) => {
  try {
    User.find({ isDisabled: { $ne: true } })
      .populate({
        path: "securityQuestions",
        populate: { path: "question" },
      })
      .populate("role")
      .exec(function (err, users) {
        if (err) {
          console.log(err);
          res.status(501).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          console.log(users);
          res.json(users);
          console.log("All users have been displayed that are NOT disabled!");
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
router.get("/users/:id", async (req, res) => {
  try {
    User.findOne({ _id: req.params.id })
      .populate({
        path: "securityQuestions",
        populate: { path: "question" },
      })
      .populate("role")
      .exec(function (err, user) {
        if (err) {
          console.log(err);
          res.status(500).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          console.log(user);
          res.json(user);
          console.log("User with the ID " + req.params.id + " has been found!");
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
router.post("/users", async (req, res) => {
  try {
    // The password to be hashed
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    const newUser = {
      userName: req.body.userName,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNum: req.body.phoneNum,
      address: req.body.address,
      email: req.body.email,
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
        console.log(
          "A new user has been created! They're name is " +
            req.body.firstName +
            " " +
            req.body.lastName +
            " and they're username is " +
            req.body.userName
        );
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

router.put("/users/:id", async (req, res) => {
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
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNum: req.body.phoneNum,
          address: req.body.address,
          email: req.body.email,
          role: req.body.role
        });

        user.save(function (err, savedUser) {
          if (err) {
            console.log(err);
            const saveUserMongodbErrorResponse = new ErrorResponse(
              "500",
              "internal server error",
              err
            );
            res.status(500).send(saveUserMongodbErrorResponse.toObject());
          } else {
            res.json(savedUser);
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const updateUserCatchErrorResponse = new ErrorResponse(
      500,
      "internal server error",
      e.message
    );
    res.status(500).send(updateUserCatchErrorResponse.toObject());
  }
});

/*
 * Delete user
 * The delete function does not actually remove a document from the collection
 * Instead, you are setting the "isDisabled" flag to true
 */
router.delete("/users/:id", async (req, res) => {
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
            res.json(updatedUser);
            console.log(
              "User with an ID of " +
                req.params.id +
                " has had their disabled flag set to true!"
            );
            console.log(user);
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
router.get("/users/:username/security-questions", async (req, res) => {
  try {
    User.findOne(
      { userName: req.params.username },
      // Projections allow us to limit the amount of data that MongoDB sends to apps & specify fields to return
      "securityQuestions"
    )
      .populate({
        path: "securityQuestions",
        populate: { path: "question" },
      })
      .exec(function (err, questions) {
        if (err) {
          console.log(err);
          res.status(500).send({
            message: "Internal server error:" + err.message,
          });
        } else if (questions == null) {
          res.status(400).send({
            message: "Could not find user " + req.params.username,
          });
        } else {
          console.log(questions);
          res.json(
            questions.securityQuestions.map((question) => ({
              text: question.question.text,
              answer: "",
            }))
          );
        }
      });
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
    User.find({}, "securityQuestions", function (err, questions) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Internal server error:" + err.message,
        });
      } else {
        console.log(
          "Here is all of the security questions I could find that aren't disabled."
        );
        console.log(questions);

        res.json(questions);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error: " + e.message);
  }
});

/*
 * Create security question - ID of user is needed
 */
router.post("/security-questions/:id", async (req, res) => {
  try {
    // Finding a user by ID
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
            console.log(
              "The user with an ID of " +
                req.params.id +
                " has a new security question! The question & answer is " +
                req.body.text +
                " " +
                req.body.answer
            );
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
 * This API will set the isDisabled flag to true
 */
router.delete("/:id/security-questions/:questionId", async (req, res) => {
  try {
    User.findOne(
      {
        _id: req.params.id,
      },
      function (err, user) {
        if (err) {
          console.log(err);
          res.status(500).send({
            message: "Internal server error:" + err.message,
          });
        } else {
          console.log(user);

          const securityQuestion = user.securityQuestions.find(
            (q) => q._id.toString() === req.params.questionId
          );

          // If question is found
          if (securityQuestion) {
            /*
             * The commented line below actually REMOVES the security question from the user document, however it's out of scope due to
             * the assignment requirements. This API can still be used to quickly delete a security question from a user document
             * if needed for testing purposes, just uncomment out the line below and comment out the securityQuestion.set code
             * block that is placed right under it
             */
            //user.securityQuestions.id(securityQuestion._id).remove();

            // Setting the isDisabled flag to true to soft-delete the security question
            securityQuestion.set({
              isDisabled: (req.body.isDisabled = true),
            });

            // Saving user document
            user.save(function (err, updatedUser) {
              if (err) {
                console.log(err);
                res.status(500).send({
                  message: "Internal server error:" + err.message,
                });
              } else {
                res.status(200).send({
                  message:
                    "Security question" + securityQuestion + " is now disabled",
                });
                console.log(
                  "The security question  " +
                    "\n" +
                    securityQuestion +
                    "\n" +
                    "  has had it's disabled flag set to true"
                );
              }
            });
          } else {
            // Displays if an invalid task ID is given
            console.log(
              "Invalid security question Id: " + req.params.questionId
            );

            res.status(300).send({
              message: "Internal security q id:" + err.message,
            });
          }
        }
      }
    );
  } catch (e) {
    console.log(e);

    res.status(500).send({
      message: "Internal server error:" + err.message,
    });
  }
});

/*
 * Update security question
 * Allows a user to update the text of the question as well as the answer
 */
router.put("/:id/security-questions/:questionId", async (req, res) => {
  try {
    User.findOne(
      {
        _id: req.params.id,
      },
      function (err, user) {
        if (err) {
          console.log(err);
          res.status(500).send({
            message: "Internal server error:" + err.message,
          });
        } else {
          console.log(user + "\n");

          const securityQuestion = user.securityQuestions.find(
            (q) => q._id.toString() === req.params.questionId
          );

          // If question is found
          if (securityQuestion) {
            // Here we're updating the security question
            securityQuestion.set({
              text: req.body.text,
              answer: req.body.answer,
            });

            // Saving user document
            user.save(function (err, updatedUser) {
              if (err) {
                console.log(err);
                res.status(500).send({
                  message: "Internal server error:" + err.message,
                });
              } else {
                res.status(200).send({
                  message: "Security question has been updated",
                });
                console.log(
                  "The security question has been updated! Now the question & answer is " +
                    req.body.text +
                    " " +
                    req.body.answer +
                    "\n" +
                    securityQuestion
                );
              }
            });
          } else {
            // Displays if an invalid task ID is given
            console.log(
              "Invalid security question Id: " + req.params.questionId
            );

            res.status(300).send({
              message: "Internal security q id:" + err.message,
            });
          }
        }
      }
    );
  } catch (e) {
    console.log(e);

    res.status(500).send({
      message: "Internal server error:" + err.message,
    });
  }
});

/*
 * Find user by ID
 */
router.get("/users/:username/role", async (req, res) => {
  try {
    User.findOne({ userName: req.params.username }, "role")
      .populate("role")
      .exec(function (err, user) {
        if (err) {
          console.log(err);
          res.status(500).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          console.log(user);
          res.json(user);
          console.log("Role for " + req.params.username + " has been found!");
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
