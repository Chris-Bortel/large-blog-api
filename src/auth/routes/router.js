'use strict';

// Bring in dependencies
const express = require('express');
const router = express.Router();

const basicAuth = require('../middleware/basicAuth.js');
const bearerAuth = require('../middleware/bearerAuth.js');
const acl = require('../middleware/acl.js');
const User = require('../models/userModel.js');

// Build a '/signup' route
router.post('/signup', async (req, res, next) => {
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
