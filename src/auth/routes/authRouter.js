'use strict';

// Bring in dependencies
const express = require('express');
const authRouter = express.Router();

const User = require('../models/userModel.js');
const basicAuth = require('../middleware/basicAuth.js');
const bearerAuth = require('../middleware/bearerAuth.js');
const userPermissions = require('../middleware/acl.js');

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
    console.log(outputObject.token);
    // send the outputObject
    res.status(201).json(outputObject);
    // output an object with the user record and the attach token'
  } catch (err) {
    next(err.message);
  }
});

// Build a '/signin' route
authRouter.post('/signin', basicAuth, (req, res, next) => {
  // take the new user and send it
  const user = {
    user: req.user,
    token: req.user.token,
  };
  console.log('USER::::::::::::::', user);
  res.status(200).json(user);
});

// Build the users route

authRouter.get(
  '/users',
  bearerAuth,
  userPermissions('delete'),
  async (req, res, next) => {
    // find all users
    try {
      const users = await User.find({});
      const userList = users.map((user) => user.username);
      console.log(userList);
      // return a list of all the users
      res.status(200).json(userList);
    } catch (e) {
      throw new Error('Invalid access');
    }
  }
);

// Build the secret route
authRouter.get(
  '/secret',
  bearerAuth,
  userPermissions('delete'),
  async (req, res, next) => {
    res.status(200).send('This is secret');
  }
);

module.exports = authRouter;
