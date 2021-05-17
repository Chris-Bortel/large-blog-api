'use strict';

// Bring in dependencies
const express = require('express');

const basicAuth = require('../middleware/basicAuth.js');
const bearerAuth = require('../middleware/bearerAuth.js');
const acl = require('../middleware/acl.js');
const 
User = require('../models/userModel.js');

const router = express.Router();

// Build a '/signup' route
router.post('/signup', async (req, res, next) => {
  try {
    let obj = {
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
    }

    // Create new instance of user
  }
})
// Build a '/signin' route
