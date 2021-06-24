'use strict';

require('dotenv').config();

const { server } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
const jwt = require('jsonwebtoken');

const User = require('../src/auth/models/userModel.js');
let users = {
  admin: { username: 'admin', password: 'password' },
  editor: { username: 'editor', password: 'password' },
  user: { username: 'user', password: 'password' },
};
// beforeEach(async (done) => {
//   await new User({
//     username: 'admin',
//     password: 'password',
//     role: 'admin',
//   }).save();
//   // adminID = admin._id;
//   let user = await new User({
//     username: 'user',
//     password: 'password',
//     role: 'user',
//   }).save();
//   // userID = user._id;
//   done();
// });
describe('Auth Router', () => {
  Object.keys(users).forEach((userType) => {
    describe(`${userType} users`, () => {
      it('can signup a new user', async () => {
        const response = await mockRequest
          .post('/signup')
          .send(users[userType]);
        const userObject = response.body;

        expect(response.status).toBe(201);
        expect(userObject.token).toBeDefined();
        expect(userObject.user._id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username);
        // const obj = {
        //   username: 'userdemo',
        //   password: 'password',
        //   role: 'user',
        // };

        // const response = await mockRequest.post('/signup').send(obj);
        // expect(response.status).toBe(201);
        // console.log('this is the outputObject', response.body.user.username);
        // expect(response.body.user.username).toBe(obj.username);

        // const results = jwt.verify(response.body.token, process.env.SECRET);
        // expect(results.username).toBe(obj.username);
      });

      xit('can sign in a user with basic authentication', async () => {
        //on sign in, we should receive a user object that includes a username, user id, and a token
      });

      xit('can sign in a user with bearer authentication', async () => {});

      xit('basic does not sign a known user in with a bad password', async () => {});

      xit('basic does not sign an unknown user in', () => {});

      xit('bearer does not sign in a user with invalid credentials', {});

      xit('should let only the admin see all of the users');
    });
  });
});
