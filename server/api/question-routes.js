/*
 * Author: Alex Haefner
 * Date: 11.25.2021
 * Description: Contains REST APIs that allow for communication between application &
 * database, performing CRUD functions
 */

var express = require("express");
const router = express.Router();
const { SecurityQuestion } = require("../models/security-questions.js");


router.post("/security-questions", async (req, res) => {
  try {


    const newQuestion = {
      text: req.body.text,

    };

    await SecurityQuestion.create(newQuestion, function (err, question) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(question);
        res.json(question);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception ${e.message}`,
    });
  }
});

router.get("/security-questions", async (req, res) => {
  try {
    SecurityQuestion.find({ isDisabled: { $ne: true } }, function (err, questions) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
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

router.put("/security-questions/:id", async (req, res) => {

  try {
    SecurityQuestion.findOne({ _id: req.params.id }, function (err, question) {
      if (err) {
        console.log(err);
        res.status(401).send({
          message: `Invalid Security Question ID: ${err}`,
        });
      } else {

        question.text = req.body.text


        question.save(function (err, updatedQuestion) {
          if (err) {
            console.log(err);

            res.json(updatedQuestion);
          } else {
            res.json(updatedQuestion);
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

router.delete("/security-questions/:id", async (req, res) => {
  try {
    SecurityQuestion.findOne({ _id: req.params.id }, function (err, securityQuestion) {
      if (err) {
        console.log(err);
        res.status(401).send({
          message: `Invalid Security Question ID: ${err}`,
        });
      } else {
        console.log(securityQuestion);

        securityQuestion.set({
          isDisabled: (req.body.isDisabled = true),
        });

        securityQuestion.save(function (err, updatedQuestion) {
          if (err) {
            console.log(err);

            res.json(updatedQuestion);
          } else {
            res.json(updatedQuestion);
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
module.exports = router;
