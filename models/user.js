// import node modules
const bcrypt = require('bcrypt');

// import and configure dotenv
require('dotenv').config();

// import env variables 
const ENV = process.env.ENV || "development";

// import and configure knex
const knexConfig = require('../knexfile'),
      knex = require('knex')(knexConfig[ENV]);

// CRUD ops on Users table
const create = (data) => knex('Users').insert(data).returning('*'),
      retrieve = (id) => knex('Users').where({id}).returning('*'),
      list = (email) => knex('Users').where({email}).returning('*'),
      update = (id, data) => knex('Users').where({id}).update(data).returning('*'),
      del = (id) => knex('Users').where({id}).del().returning('*');

// hash a string
const hash = (str) => new Promise((resolve, reject) => bcrypt.hash(str, 10, (err, hash) => err ? reject(err) : resolve(hash)));

// compare a raw string to a hashed string 
const compare = (str, hash) => new Promise((resolve, reject) => bcrypt.compare(str, hash, (err, result) => err ? reject(err) : (result ? resolve(result) : reject('does not match'))));

module.exports = {
  create,
  retrieve,
  list,
  update,
  del,
  hash,
  compare
}