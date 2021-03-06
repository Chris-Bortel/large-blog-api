'use strict';

const base64 = require('base-64');

const User = require('../models/userModel.js');

module.exports = async (req, res, next) => {
  let invalidErr = {
    message_spec: 'Invalid username or password. Please try again.',
    statusCode: 401,
    statusMessage: 'Unauthorized',
  };

  if (!req.headers.authorization) {
    next(invalidErr);
    return;
  }

  try {
    let authorization = req.headers.authorization;
    let encoded = authorization.split(' ')[1];
    let credentials = base64.decode(encoded);
    let [username, password] = credentials.split(':');

    let validUser = await User.authenticateBasic(username, password);

    // why did I write it
    if (validUser) {
      req.token = await User.generateToken();
      req.user = validUser;
      next();
      return 'success';
    } else {
      next(invalidErr);
      return;
    }
  } catch (err) {
    console.log(err);
    // next('Invalid Login')
    next(err);
  }
};
