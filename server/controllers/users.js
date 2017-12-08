'use strict';

// import the db object with all the models;
// since they're all attached to it
// you just import the index file
let User = require('../models').User;

// super nice module that let you fake data
// go check their github for more methods !
let faker = require('faker');

module.exports = {
  list(req, res, next) {
    // sync the db...
    return User.sync()
      .then(() => {
        // you return all the entries
        return User.findAll()
          .then(users => res.json(users))
          .catch(e => console.error('error finding entries: ', e))
      })
      .catch(e => console.error('error syncing with db: ', e))
  },

  find(req, res, next) {
    return User.sync()
      .then(() => {
        // you return all the entries
        return User.findById(req.params.param1)
          .then(user => res.json(user))
          .catch(e => console.error('error finding entries: ', e))
      })
      .catch(e => console.error('error syncing with db: ', e))
  },

  create(req, res, next) {
    // the faker module doing magic
    let user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    }

    // sequelize need to return a value after a promise
    // first you sync the table 'db.Model'
    return User.sync()
      .then(() => {
        // you return the creation of an entry
        return User.create(req.body)
          .then((newUser) => res.json(newUser))
          .catch(e => console.error('error creating entry: ', e))
      })
      .catch(e => console.error('error syncing with db: ', e))
  },

  update(req,res,next) {

  },
  

  delete(req, res, next) {
    return User.sync()
      .then(() => {
        // find a user
        return User.findById(req.params.param1)
          .then(user => {
            // then KIIL IT !
            return user.destroy()
          })
          .then((user) => res.send(console.log(`${user} element destroyed !`)))
          .catch(e => console.error('something went wrong: ', e))
      })
      .catch(e => console.error('something went wrong: ', e))
  }
}