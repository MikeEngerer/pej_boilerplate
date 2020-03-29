// import and configure dotenv
require('dotenv').config()

// import env variables
const ENV = process.env.ENV || "development";

// import and configure knex 
const knexConfig = require('../knexfile.js'),
      knex = require('knex')(knexConfig[ENV]);

// CRUD ops on Posts table
const create = (data) => knex('Posts').insert(data).returning('*'),
      retrieve = (id) => knex('Posts').where({id}).returning('*'),
      list = (user_id) => knex('Posts').where({user_id}).returning('*'),
      update = (id, data) => knex('Posts').where({id}).update(data).returning('*'),
      del = (id) => knex('Posts').where({id}).del().returning('*');

module.exports = {
  create,
  retrieve,
  list,
  update,
  del
}