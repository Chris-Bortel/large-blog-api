'use strict';

require('dotenv').config();

const { server } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
const jwt = require('jsonwebtoken');

const User = require('../src/auth/models/userModel.js');

describe('Auth Router', () => {
  it('can signup a new user', async () => {});
});
