'use strict';

const { server } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const User = require('../src/auth/models/userModel.js');
const acl = require('../src/auth/middleware/acl.js');
const bearerAuth = require('../src/auth/middleware/bearerAuth.js');
const jwt = require('jsonwebtoken');

const mockRequest = supergoose(server);

// TODO: I do not think that I need to bring in all of the middleware, I should just need the user model and acl.js.
let token;
let users = {
  admin: { username: 'admin', password: 'password', role: 'admin' },
};

// Pre-load our database with fake users
beforeAll(async (done) => {
  const user = await new User(users.admin).save();
  console.log(user);
  token = jwt.sign(users, process.env.SECRET);
  console.log(token);
  done();
});

describe('Access control tests', () => {
  it('should allow an admin to access the "/users" route', async () => {
    console.log('users:', users.admin);

    console.log('Token:', token);
    let headers = {
      authorization: token,
    };
    const aclResponse = await mockRequest.get('/users', headers);
    expect(aclResponse).toBe(201);
    console.log(aclResponse);
  });
});
