'use strict';

require('@code-fellows/supergoose');
const basicAuth = require('../src/auth/middleware/basicAuth.js');
const User = require('../src/auth/models/userModel.js');

beforeAll(async (done) => {
  await new User({
    username: 'admin',
    password: 'password',
    role: 'admin',
  }).save();
  done();
});

afterAll(async () => {
  await User.deleteMany({});
});

let res = {};

describe('basic auth tests', () => {
  it('should not validate sign-in if user provide invalid username and password', async () => {
    let req = {
      headers: {
        authorization: 'Basic YWRtaW46Zm9v',
      },
    };

    let next = jest.fn();

    const invalidErr = {
      message_spec: 'Invalid username or password. Please try again.',
      statusCode: 401,
      statusMessage: 'Unauthorized',
    };
    await basicAuth(req, res, next);
    expect(next).toHaveBeenCalledWith(invalidErr);
  });

  it('should validate sign-in if user provides valid username and password', async () => {
    let req = {
      headers: {
        authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
      },
    };

    let next = jest.fn();
    await basicAuth(req, res, next);
    expect(next).toHaveBeenCalledWith(201);
  });

  it('should block user with no header authorization', async () => {
    let req = {
      headers: {},
    };
    let next = jest.fn();
    let invalidErr = {
      message_spec: 'Invalid username or password. Please try again.',
      statusCode: 401,
      statusMessage: 'Unauthorized',
    };
    await basicAuth(req, res, next);
    expect(next).toHaveBeenCalledWith(invalidErr);
  });
});
