'use strict';

// Bring in dependencies
const express = require('express');
const authRouter = express.Router();

const basicAuth = require('../middleware/basicAuth.js');
const bearerAuth = require('../middleware/bearerAuth.js');
const userPermissions = require('../middleware/acl.js');
const User = require('../models/userModel.js');

// Build a '/signup' route
authRouter.post('/signup', async (req, res, next) => {
  try {
    // bring in the user object from user-model
    const user = new User(req.body);
    const userRecord = await user.save();
    const outputObject = {
      user: userRecord,
      token: userRecord.token,
    };
    // send the outputObject
    res.status(201).json(outputObject);
    // output an object with the user record and the attach token'
  } catch (err) {
    next(err.message);
  }
});

// Build a '/signin' route
authRouter.post('signin', basicAuth, (req, res, next) => {
  // take the new user and send it
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});

// Build the users route

authRouter.get(
  '/users',
  bearerAuth,
  userPermissions('delete'),
  async (req, res, next) => {
    // find all users
    const users = await User.find({});
    const userList = users.map(user.username);
    // return a list of all the users
    res.status(200).json(userList);
  }
);

// Build the secret route
authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('This is secret');
});

module.exports = authRouter;
