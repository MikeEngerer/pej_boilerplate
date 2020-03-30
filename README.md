# PEJ Boilerplate

The foundation for an MVC style Postgresql, Express and Json Web Token web app. 

Comes equipped with models, controllers, and middleware.

Other included features
- users/posts RESTful [routes](#included-endpoints)
- initial migrations (knex) for users/posts tables
- secure password storage and checking via bcrypt
- [.env field verification](#verify-env) on ```npm start``` 
- helper library with functions for type checking, data => model merging, and more

### Getting Started
---

1. ```git clone git@github.com:MikeEngerer/pej_boilerplate.git```
2. ```npm i``` 
3. Within psql shell: ```create database <DB_NAME> owner <DB_USER>;```
4. ```npx knex migrate:latest``` 
5. ```touch .env```
6. Populate newly created .env by mirroring .env.example
7. npm start

### Next Steps
---

##### Create Views

None of this has any purpose without a front-end to interact with. Be sure to reference models when building your users/posts forms.

##### Customize Tables

Included db tables are purposely kept to bare minimum. When adding new fields to an existing model:

update table's model within models/\<model\>.js
- update model object (used by helpers/core.js: ```fitDataToModel(model, data)``` when inserting/updating rows)
  - this func verifies all required fields are present in ```data``` and returns a new object, discarding all fields from ```data``` other than required/optional fields
  - ```const model = { required: { <new required field name>: null }, optional: { <new optional field name>: null }}; ```

update table
- ```npx knex migrate:make <migration name>```
- within db/migrations/\<migration name\>.js
  - update exports.up, exports.down with your new changes
  - a model's 'required' fields are those which are ```.notNullable()```

\*OR\*

update table (lazy)
- prior to running ```npx knex migrate:latest``` in [Getting Started](#getting-started) you could first just edit the existing migration

### Included Endpoints
---

##### controllers/users.js

POST /users
  - create a new user in users table

POST /users/login 
- log in an existing user
- sends back a new JWT to be stored in client's browser (localStorage, sessionStorage, cookies, etc.)

POST /users/logout 
- log out a logged in user
- there are a number of ways to invalidate a JWT so I've left this one pretty bare; see [invalidating json web tokens](https://stackoverflow.com/questions/21978658/invalidating-json-web-tokens)

##### controllers/posts.js

\* all endpoints below utilize /middlewares/jwt.js

GET /posts
- retrieve a list of posts from posts table

POST /posts
- create a new post in posts table

GET /posts/:post_id
-  retrieve a single post from posts table

PATCH /posts/:post_id 
- update a single post in posts table

DELETE /posts/:post_id
- deletes a single post in posts table

### Notes
---

##### Verify Env

Included is a script to verify that all required .env fields are populated. This runs via ```npm start``` prior to starting up the server. Turn off this check by removing ```"prestart": "node ./scripts/verifyEnv.js"``` from package.json.

##### JWT

The user's plain text ```user_id``` (which by default is just an incremented integer) is stored within their JWT's data. This is probably not the most secure thing, since knowing ```JWT_SECRET``` is all that's required to decode it. If your web app is to be deployed you may want to consider other approaches, or at least encrypting ```user_id```.

### File Strucure
---

```
|-- db/
|---- migrations/
|------ ..._users.js
|------ ..._posts.js
|---- seeds/
|-- models/
|---- auth.js
|---- post.js
|---- user.js
|-- views/
|-- controllers/
|---- posts.js
|---- users.js
|-- helpers/
|---- core.js
|-- middlewares/
|---- jwt.js
|-- scripts/
|---- verifyEnv.js
|-- server.js
|-- knexfile.js
|-- package.json
|-- .env.example
|-- .gitignore
|-- README.md

```

### Dependencies
---

* dotenv
* express
* body-parser
* pg
* knex
* jsonwebtoken
* bcrypt
* nodemon