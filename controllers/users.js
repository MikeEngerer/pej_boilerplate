// import node modules
const express = require('express'),
      bodyParser = require('body-parser');

// import and configure dotenv
require('dotenv').config();

// import env variables
const ENV = process.env.ENV || "development";

// import models
const User = require('../models/user'),
      Auth = require('../models/auth');

// import middleware
const Jwt = require('../middlewares/jwt');

// import helper libraries
const Helpers = require('../helpers/core');

// init router
const router = express.Router();

// apply middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: false
}));

// POST /users: 
// create user
router.post('/', (req, res) => {

  // data = { email, password }
  const { data } = req.body;

  if (!data) return res.status(422).send({status: 'error', message: 'unprocessable entity'});

  // to be assigned after fitting data to model 
  let formattedData;

  return Helpers.fitDataToModel(User.model, data)
    .then(data => formattedData = data)
    .then(() => User.list(formattedData.email))
    .then(user => !user.length ? User.hash(formattedData.password) : Promise.reject('exists'))
    .then(hash => formattedData.password = hash)
    .then(() => User.create(formattedData))
    .then(() => res.send({status: 'success', message: 'created'}))
    .catch(err => {console.error(err); return res.status(500).send({status: 'error', message: ''})});

});

// POST /users/login:
// log in user
router.post('/login', (req, res) => {

  // data = { email, password }
  const { data }  = req.body;

  if (!data || !data.email || !data.password) return res.status(422).send({status: 'error', message: 'unprocessable entity'});

  return User.list(data.email || null)
    .then(user => user.length ? user[0] : Promise.reject('does not exist'))
    .then(user => Promise.all([User.compare(data.password || null, user.password), user]))
    .then(([result, user]) => result ? Auth.createJWT({id: user.id}) : Promise.reject('did not match'))
    .then(jwt => res.send({status: 'success', message: 'logged in', data: jwt}))
    .catch(err => {console.error(err); return res.status(403).send({status: 'error', message: ''})});
});

// POST /users/logout:
// log out user 
router.post('/logout', Jwt.verify, (req, res) => res.send({status: 'success', message: 'logged out'}));

module.exports = router;