'use strict';

const e = require('express');

module.exports = (capability) => {
  return (req, res, next) => {
    try {
      if (req.user.capabilities.includes(capability)) {
        next();
      } else {
        next('You do not have the necessary credentials');
      }
    } catch (e) {
      next('Invalid Access');
    }
  };
};
