'use strict';

const user = require('../models/userModel.js');

module.exports = async (req, res, next) => {
  let invalidErr = {
    message_spec: 'You are not authorized. Please try to login again.',
    statusCode: 401,
    statusMessage: 'Unauthorized',
  };

  if (!req.headers.authorization) {
    next();
    return;
  }

  let token = req.headers.authorization.split(' ').pop();

  let validUser;
  try {
    validUser = await user.authenticateWithToken(token);
  } catch (err) {
    next(invalidErr);
    return;
  }
  req.user = validUser;
  req.token = validUser.token;
  next();
};
