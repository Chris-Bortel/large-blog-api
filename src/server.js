'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const timeStamp = require('./middleware/timestamp.js');
const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/error.js');

const v1Routes = require('./api/v1.js');
const authRouter = require('./auth/routes/authRouter.js');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(morgan('combined'));

// Route Definitions
app.use(authRouter);
app.use('/api/v1', v1Routes);

app.use(timeStamp);
// app.use(logger);

// Error handlers
app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    if (!port) {
      throw new Error('Missing Port');
    }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
