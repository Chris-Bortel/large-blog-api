'use strict';

process.env.SECRET = 'toes';

require('@code-fellows/supergoose');
const middleware = require('../src/auth/middleware/bearerAuth.js');
const Users = require('../src/auth/models/userModel.js');
const jwt = require('jsonwebtoken');
