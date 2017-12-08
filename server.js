'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let Router = require('universal-node-router');

// here we set the method that will enable the routing
let router = new Router(__dirname);

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));

// routing API with path to controllers folder
app.use('/api', router.mapper('./server/controllers'));

let server = app.listen(9999, () => {
  console.log('Server started on port 9999');
});