'use strict';

require('dotenv').config();

const mongoose = require('mongoose');

const server = require('./src/server.js');
// const MONGODB_URI = process.env.DB_URL

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGODB_URI, options).then(() => {
  server.start(process.env.PORT);
});

// TODO: What is the difference between this and the above
// mongoose.connect(MONGODB_URL, mongooseOptions)
//   .then(console.log('connected to db'))
//   .catch(e=>console.error(e));

// server.start();
