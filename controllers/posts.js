// import node modules
const express = require('express'),
      bodyParser = require('body-parser');

// import and configure dotenv
require('dotenv').config();

// import env variables
const ENV = process.env.ENV || "development";

// import models
const Post = require('../models/post');

// import middleware
const Jwt = require('../middlewares/jwt');

// init router
const router = express.Router();

// apply middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(Jwt.verify);

// GET /posts:
// fetch a list of posts
router.get('/', (req, res) => {
  // fetch list of posts from db
  return Post.list(id)
    .then(posts => res.send({status: 'success', message: 'retrieved', posts}))
    .catch(err => res.status(500).send({status: 'error', message: ''}));
});

// POST /posts:
// create post
router.post('/', (req, res) => {

  const { data } = req.body,
        { id } = req.session;
  // not logged in
  if (!id) return res.status(403).send({status: 'error', message: 'forbidden'});
  // missing data
  if (!data) return res.status(422).send({status: 'error', message: 'unprocessable entity'});

  data.user_id = id;

  // create post 
  return Post.create(data)
    .then(resp => res.send({status: 'success', message: 'created'}))
    .catch(err => res.status(500).send({status: 'error', message: ''}));
});

// GET /posts/:post_id:
// retrieve a single post
router.get('/:post_id', (req, res) => {

  const { post_id } = req.params,
        { id } = req.session;
  // not logged in
  if (!id) return res.status(403).send({status: 'error', message: 'forbidden'});
  // missing data
  if (!post_id) return res.status(422).send({status: 'error', message: 'unprocessable entity'});

  // fetch post from db
  return Post.retrieve(post_id)
    .then(post => res.send({status: 'success', message: 'retrieved', post}))
    .catch(err => res.status(500).send({status: 'error', message: ''}));
});

// DELETE /posts/:post_id:
// delete a single post
router.delete('/:post_id', (req, res) => {

  const { post_id } = req.params,
        { id } = req.session;

  // not logged in
  if (!id) return res.status(403).send({status: 'error', message: 'forbidden'});
  // missing data
  if (!post_id) return res.status(422).send({status: 'error', message: 'unprocessable entity'});

  // delete post from db
  return Post.del(post_id)
    .then(result => res.send({status: 'success', message: 'deleted'}))
    .catch(err => res.status(500).send({status: 'error', message: ''}));
});

// PATCH /:post_id:
// update a single post
router.patch('/:post_id', (req, res) => {

  const { post_id } = req.params,
        { id } = req.session,
        { data } = req.body;

  // not logged in
  if (!id) return res.status(403).send({status: 'error', message: 'forbidden'});
  // missing data
  if (!post_id || !data) return res.status(422).send({status: 'error', message: 'unprocessable entity'});

  // 
  return Post.update(post_id, data)
    .then(result => res.send({status: 'success', message: 'updated'}))
    .catch(err => res.status(500).send({status: 'error', message: ''}));
});

module.exports = router;