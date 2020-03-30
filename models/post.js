// import and configure dotenv
require('dotenv').config()

// import env variables
const ENV = process.env.ENV || "development";

// import and configure knex 
const knexConfig = require('../knexfile.js'),
      knex = require('knex')(knexConfig[ENV]);

// define post model
const model = {
  required: {
    user_id: null
  },
  optional: {
    
  }
};

// CRUD ops on posts table
const create = (data) => knex('posts').insert(data).returning('*'),
      retrieve = (id) => knex('posts').where({id}).returning('*'),
      list = (user_id) => knex('posts').where({user_id}).returning('*'),
      update = (id, data) => knex('posts').where({id}).update(data).returning('*'),
      del = (id) => knex('posts').where({id}).del().returning('*');

module.exports = {
  model,
  create,
  retrieve,
  list,
  update,
  del
}