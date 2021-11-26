/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const { Router } = require('express');
const { userInfo } = require('os');


/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/bcrs')));
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')));

/**
 * Variables
 */
const port = 3000; // server port

// TODO: This line will need to be replaced with your actual database connection string
const conn = 'mongodb+srv://admin:admin@buwebdev-cluster-1.8auop.mongodb.net/bcrs?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * API(s) go here...
 */

/* Sign-in */

app.post('/sign-in', async (req, res) => {
  try {
      User.findOne({
          'userName': req.body.userName
      }, function(err, user) {
          if (err) res.status(501).send("MongoDB exception")

          //Create object literal named newRegisteredUser, map the RequestBody values to the objects properties
          if (user) {
              //Compare the RequestBody password against the saved users password using the bcrypt.compareSync() function
              let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

              //Checks if password is valid
              if (passwordIsValid) {
                  //Returns message for status 200
                  console.log('Password is valid!');
                  res.status(200).send({'message': 'User logged in'})
              } else {
                  res.status(401).send("Invalid username and/or password")
              }
          }

          if (!user) res.status(401).send("Invalid username and/or password")
      });
  } catch (error) {
      res.status(500).send("server exception")
  }
})



/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
