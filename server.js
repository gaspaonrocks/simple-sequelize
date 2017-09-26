'use strict';

let express = require('express');
let bodyParser = require('body-parser');

// here we set the method that will enable the routing
let usersRoutes = require('./server/routes/users');

let router = express.Router()

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));

// routing API with method called
app.use('/user', usersRoutes());

let server = app.listen(9999, () => {
  console.log('Server started on port 9999');
});