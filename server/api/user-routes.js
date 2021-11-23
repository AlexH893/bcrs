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

/*
 * Find all users
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

module.exports = router;
