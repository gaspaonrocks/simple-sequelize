'use strict';

// the arguments here will be injected from outside use
module.exports = function (sequelize, DataTypes) {

  // new model definition
  let User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  })

  return User
}