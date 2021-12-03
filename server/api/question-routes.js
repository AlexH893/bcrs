/*
 * Author: Alex Haefner
 * Date: 11.25.2021
 * Description: Contains REST APIs that allow for communication between application &
 * database, performing CRUD functions
 */

var express = require("express");
const router = express.Router();
const Question = require("../models/security-questions.js");
const bcrypt = require("bcrypt");

module.exports = router;
