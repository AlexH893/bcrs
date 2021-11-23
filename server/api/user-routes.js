/*
 * Author: Alex Haefner
 * Date: 11.23.2021
 * Description: Contains REST APIs that allow for communication between application &
 * database, peforming CRUD functions
 * Sources: Getting MEAN with Mongo, Express, Angular, and Node, Second Edition,
 * https://docs.mongodb.com/manual/reference/operator/query/ne/#mongodb-query-op.-ne
 */

var express = require("express");
const router = express.Router();
const User = require("../models/user.js");
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
 */
router.post("/user", async (req, res) => {
  try {
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

module.exports = router;
