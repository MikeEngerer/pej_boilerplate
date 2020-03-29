require('dotenv').config();

const Core = require('./helpers/core');


// required env vars in all environments
let model = {
  PORT: null,
  ENV: null,
  JWT_SECRET: null
};

if (process.env.ENV === 'production') {
  // required env vars in production environment
  model = {
    ...model, 
    DB_URL: null
  };
} else {
  // required env vars in development environment
  model = {
    ...model,
    DB_HOST: null,
    DB_USER: null,
    DB_PASS: null,
    DB_NAME: null,
    DB_PORT: null 
  };
}

Core.fitDataToModel(model, process.env) 
  .then(() => console.log('.env checked and verified to contain all required fields'))
  .catch(err => console.error('.env incomplete...\n', err));