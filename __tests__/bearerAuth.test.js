'use strict';

require('@code-fellows/supergoose');
const bearerAuth = require('../src/auth/middleware/bearerAuth.js');
const User = require('../src/auth/models/userModel.js');

var token;

beforeAll(async (done) => {
  const user = await new User({
    username: 'admin',
    password: 'password',
    // role: 'admin',
  }).save();
  // token = user.generateToken();
  // console.log(token);
  done();
});
afterAll(async () => {
  await User.deleteMany({});
});

let res = {};

describe('basic auth tests', () => {
  it('should not validate sign-in if user provide a bad token', async () => {
    let req = {
      headers: {
        authorization: 'a bad token',
      },
    };
    let next = jest.fn();
    let invalidErr = {
      message_spec: 'You are not authorized. Please try to login again.',
      statusCode: 401,
      statusMessage: 'Unauthorized',
    };
    await bearerAuth(req, res, next);
    expect(next).toHaveBeenCalledWith(invalidErr);
  });

  it('should validate sign-in if user provide a good token', async () => {
    let req = {
      headers: {
        authorization: token,
      },
    };
    let next = jest.fn();

    await bearerAuth(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  xit('should not validate sign-in if user provide NO token', async () => {
    let req = {
      headers: {},
    };
    let next = jest.fn();
    let invalidErr = {
      message_spec: 'You are not authorized. Please try to login again.',
      statusCode: 401,
      statusMessage: 'Unauthorized',
    };
    await bearerAuth(req, res, next);
    expect(next).toHaveBeenCalledWith(invalidErr);
  });
});
