'use strict';

// import the db object with all the models;
// since they're all attached to it
// you just import the index file
let Task = require('../models').Task;
let User = require('../models').User;

module.exports = {
  list(req, res, next) {
    // sync the db...
    return Task.sync()
      .then(() => {
        // you return all the entries
        return Task.findAll({ include: [User] })
          .then(tasks => res.json(tasks))
          .catch(e => console.error('error finding entries: ', e))
      })
      .catch(e => console.error('error syncing with db: ', e))
  },

  find(req, res, next) {
    return Task.sync()
      .then(() => {
        // you return all the entries
        return Task.findById(req.params.param1, { include: [User] })
          .then(task => res.json(task))
          .catch(e => console.error('error finding entries: ', e))
      })
      .catch(e => console.error('error syncing with db: ', e))
  },

  create(req, res, next) {
    // sequelize need to return a value after a promise
    // first you sync the table 'db.Model'
    return Task.sync()
      .then(() => {
        // you return the creation of an entry
        return Task.create(req.body)
          .then(newTask => res.json(newTask))
          .catch(e => console.error('error creating entry: ', e))
      })
      .catch(e => console.error('error syncing with db: ', e))
  },

  update(req, res, next) {
    return Task.sync()
      .then(() => {
        return Task.findById(req.params.param1)
          .then(task => {
            task.update(req.body)
              .then(updatedTask => res.json(`Task updated, new value is ${updatedTask}`))
              .catch(e => re.json(`error: ${e}`))
          })
          .catch(e => res.json(`error syncing with db: ${e}`))
      })
  },

  delete(req, res, next) {
    return Task.sync()
      .then(() => {
        // find a user
        return Task.findById(req.params.param1)
          .then(task => {
            // then KILL IT !
            return task.destroy()
          })
          .then((task) => res.send(console.log(`${task} destroyed !`)))
          .catch(e => console.error('something went wrong: ', e))
      })
      .catch(e => console.error('something went wrong: ', e))
  }
}