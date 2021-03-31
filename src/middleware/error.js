'use strict';

module.exports = (err, req, res, next) => {
  console.log(err);
  res.statusCode = err.statusCode || 500;
  res.statusMessage =
    err.statusMessage || 'Internal server error. Please try again later.';
  res.send(
    err.message_spec || 'Internal server error. Please try again later.'
  );
  res.end();
};
