// import node modules
const express = require('express');

// import and configure dotenv
require('dotenv').config();

// import env variables
const PORT = process.env.PORT || 8080,
      ENV = process.env.ENV || 'development'; 

// import controllers
const users = require('./controllers/users'),
			posts = require('./controllers/posts');

// init express app
const app = express();

// attach controllers to app
app.use('/users', users);
app.use('/posts', posts);

// root endpoint
app.get('/', (req, res) => res.send('Hello World!'));

// init app server
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
