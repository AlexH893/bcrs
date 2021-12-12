/*
============================================
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 27 November 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: App.js
===========================================
*/

/**
 * Require statements
 */

const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const { Router } = require("express");
const { userInfo } = require("os");
let userRoutes = require("./api/user-routes.js");
let questionRoutes = require("./api/question-routes.js");
let sessionRoutes = require("./api/session-routes.js");
let roleRoutes = require("./api/role-routes.js");
let invoiceRoutes = require("./api/invoice-routes.js");


var cors = require("cors");

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../dist/bcrs")));
app.use("/", express.static(path.join(__dirname, "../dist/bcrs")));

app.use(cors());

/**
 * Variables
 */
const port = 3000; // server port

// TODO: This line will need to be replaced with your actual database connection string
const conn =
  "mongodb+srv://admin:admin@buwebdev-cluster-1.8auop.mongodb.net/bcrs?retryWrites=true&w=majority";
/**
 * Database connection
 */
mongoose
  .connect(conn, {
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.debug(`Connection to the database instance was successful`);
  })
  .catch((err) => {
    console.log(`MongoDB Error: ${err.message}`);
  }); // end mongoose connection

/**
 * API(s) go here...
 */
app.use("/api/session", sessionRoutes);

app.use("/api", [questionRoutes, userRoutes]);

app.use("/api/roles", roleRoutes);

app.use("/api/invoice", invoiceRoutes);


/**
 * Create and start server
 */
http.createServer(app).listen(port, function () {
  console.log(`Application started and listening on port: ${port}`);
}); // end http create server function
