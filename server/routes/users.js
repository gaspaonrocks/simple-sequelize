'use strict';

const express = require('express');
const router = express.Router();

// super nice module that let you fake data
// go check their github for more methods !
let faker = require('faker');

// import the db object with all the models;
// since they're all attached to it
// you just import the index file
let models = require('../models')

module.exports = function () {
  // put longer urls first otherwise the first short path
  // that matches will catch all the others...
  router.get('/create', (req, res) => {
    // the faker module doing magic
    let user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    }

    // sequelize need to return a value after a promise
    // first you sync the table 'db.Model'
    return models.User.sync()
      .then(() => {
        // you return the creation of an entry
        return models.User.create(user)
          .then((newUser) => res.json(newUser))
          .catch(e => console.error('error creating entry: ', e))
      })
      .catch(e => console.error('error syncing with db: ', e))
  });

  router.get('/delete/:id', (req, res) => {
    // sync the db...
    return models.User.sync()
      .then(() => {
        // find a user
        return models.User.findById(req.params.id)
          .then(user => {
            // then KIIL IT !
            return user.destroy()
          })
          .then(() => res.send(console.log('element destroyed !')))
          .catch(e => console.error('something went wrong: ', e))
      })
      .catch(e => console.error('something went wrong: ', e))
  })

  router.get('/', (req, res) => {
    // sync the db...
    return models.User.sync()
      .then(() => {
        // you return all the entries
        return models.User.findAll()
          .then(users => res.json(users))
          .catch(e => console.error('error finding entries: ', e))
      })
      .catch(e => console.error('error syncing with db: ', e))
  });

  router.get('/:id', (req, res) => {
    res.json();
  });

  return router
};