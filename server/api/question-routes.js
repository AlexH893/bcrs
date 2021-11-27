/*
 * Author: Alex Haefner
 * Date: 11.25.2021
 * Description: Contains REST APIs that allow for communication between application &
 * database, peforming CRUD functions
 */

var express = require("express");
const router = express.Router();
const Question = require("../models/security-questions.js");
const bcrypt = require("bcrypt");

/*
 * Find all security questions API
 * The $ne operator will return all documents where isDisabled is not true
 */
router.get("/security-questions", async (req, res) => {
  try {
    Question.find({ isDisabled: { $ne: true } }, function (err, questions) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(questions);
        res.json(questions);
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
