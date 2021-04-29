'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const timeStamp = require('./middleware/timestamp.js');
const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/error.js');
const v1Routes = require('./api/v1.js');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(morgan('combined'));

// app.get('/demo', demoRouteHandler);

// function demoRouteHandler(req, res) {
//   res.status(200).send('I work');
// }

// const authRouter = './auth/routes/router.js';
// const v1Routes = './api/v1.js';

// Route Definitions
// app.use(authRoutes);
app.use('/api/v1', v1Routes);

app.use(timeStamp);
// app.use(logger);

// Error handlers
app.use('*', notFoundHandler);
// app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    if (!port) {
      throw new Error('Missing Port');
    }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
