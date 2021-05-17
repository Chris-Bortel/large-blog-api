'use strict';

const e = require('express');

module.exports = (capability) => {
  return (req, res, next) => {
    if (req.user.capabilities.include(capability)) {
      next();
    } else {
      throw new Error('Invalid access');
    }
  };
};
