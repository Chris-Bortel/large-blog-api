'use strict';

const express = require('express');
const cors = require('cors');

const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/error.js');

// const authRouter = './auth/routes/router.js';
// const v1Routes = './api/v1.js';

// const timeStamp = require('./middleware/timestamp.js');
// const logger = require('./middleware/logger.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Definitions
// app.use(authRoutes);
// app.use('/api/v1/', v1Routes);

// app.use(timeStamp);
// app.use(logger);
// Error handles
// app.use('*', notFoundHandler);
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
