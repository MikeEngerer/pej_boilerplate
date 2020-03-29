// import node modules
const jwt = require('jsonwebtoken');

// import and configure dotenv
require('dotenv').config();

// import env variables
const { JWT_SECRET } = process.env;

// create jwt
const createJWT = (data = {}) => new Promise((resolve, reject) => jwt.sign(data, JWT_SECRET, (err, result) => err ? reject(err) : resolve(result)));

module.exports = {
  createJWT
}