'use strict';

process.env.SECRET = 'toes';

require('@code-fellows/supergoose');
const middleware = require('../src/auth/middleware/bearer.js');
const Users = require('../src/auth/models/user-model.js');
const jwt = require('jsonwebtoken');
