'use strict';

require('dotenv').config();

const mongoose = require('mongoose');

const server = require('./src/server.js');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGODB_URI, options).then(() => {
  server.start(process.env.PORT);
});
