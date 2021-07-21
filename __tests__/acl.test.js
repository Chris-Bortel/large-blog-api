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
  // const token = jwt.sign(users, process.env.SECRET);
  token = user.generateToken();
  console.log(token);
  done();
});

describe('Access control tests', () => {
  // it('should respond with a 200 on a valid route', async () => {
  //   const result = await mockRequest.get('/api/v1/article');
  //   expect(result.status).toBe(200);
  // });

  it('should allow an admin to access the "/users" route', async () => {
    console.log(users.admin);
    const token = jwt.sign(users, process.env.SECRET);
    console.log(token);

    const aclResponse = await mockRequest.get('/users');
    // .set('Authorization', `Bearer ${token}`);

    console.log(aclResponse);
  });
});
