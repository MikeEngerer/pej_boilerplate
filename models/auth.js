// import node modules
const jwt = require('jsonwebtoken');

// import and configure dotenv
require('dotenv').config();

// import env variable
const { JWT_SECRET } = process.env;

// create jwt
const createJWT = (data = {}) => Promise.resolve(jwt.sign(data, JWT_SECRET));

module.exports = {
  createJWT
}