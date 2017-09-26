'use strict';

var Sequelize = require('sequelize')
// set the env variable
var env = 'development'
// the [env] is called as attribute of config object
// go check the config file
var config = require('../config/dbconfig')[env]

// new database instance created here
var sequelize = new Sequelize(config.database, config.username, config.password, config)

// declare new empty database object
var db = {}

/*---------- do the following for each model file ----------*/

// declare variable and set value imported from model files
var model = sequelize.import('./user.js')
// declare db attribute and set previous value   
db[model.name] = model

// set attribute from both db instance and main Sequelize class 
db.sequelize = sequelize
db.Sequelize = Sequelize

// test the connection when server is running
db.sequelize.authenticate()
  .then(() => console.log('success'))
  .catch(e => console.error('error connection: ', e))

module.exports = db