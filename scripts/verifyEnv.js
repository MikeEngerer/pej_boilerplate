// import and configure dotenv
require('dotenv').config();

// import helper libraries
const Core = require('../helpers/core');

// required env vars in all environments
// as .env grows, add its new fields here
let model = {
  required: {
    PORT: null,
    ENV: null,
    JWT_SECRET: null
  },
  optional: {}
};

if (process.env.ENV === 'production') {
  // required env vars in production environment
  model = {
    required: {
      ...model.required,
      DB_URL: null
    },
    optional: {
      ...model.optional
    } 
  };
} else {
  // required env vars in development environment
  model = {
    required: {
    ...model.required,
      DB_HOST: null,
      DB_USER: null,
      DB_PASS: null,
      DB_NAME: null,
      DB_PORT: null 
    },
    optional: {
      ...model.optional
    }
  };
}

Core.fitDataToModel(model, process.env) 
  .then(() => console.log('\x1b[32m%s\x1b[0m', '.env verified to contain all required fields'))
  .catch(err => { 
    console.error('\x1b[31m%s\x1b[0m', '.env incomplete...')
    console.error(err, '\n')
  });
