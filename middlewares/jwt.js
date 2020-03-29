// import node modules
const jwt = require('jsonwebtoken');

// import and configure dotenv
require('dotenv').config();

// import env variable
const { JWT_SECRET } = process.env;

// verifies token sent in req.header is valid via JWT_SECRET
// within here, any ref to id -> user id
const verify = (req, res, next) => {

  const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;

  if (!token) return res.status(401).send({status: 'error', message: 'unauthorized'});

  // data = { id }
  const data = jwt.verify(token, JWT_SECRET);

  if (!data || !data.id) return res.status(401).send({status: 'error', message: 'unauthorized'});

  const { id } = data;
  // merge req.body with id
  // req.body = { id, data }
  req.body = { id, ...req.body };

  return next();
}


module.exports = {
  verify
};
