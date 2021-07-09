'use strict';

require('@code-fellows/supergoose');
const jwt = require('jsonwebtoken');
const User = require('../src/auth/models/userModel.js');
const SECRET = process.env.SECRET || 'supersecret';
console.log = jest.fn();

afterEach(async () => {
  await User.deleteMany({});
});

const fakeUser = {
  username: 'username',
  password: 'password',
  role: 'user',
};

describe('user model tests', () => {
  it('should save hashed password', async () => {
    //1. create a new user and save it to database
    const newUser = await new User(fakeUser).save();
    //2. check the username matches our fake user
    expect(newUser.username).toBe(fakeUser.username);
    //3. check the password do NOT match the fake user.
    expect(newUser.password).not.toBe(fakeUser.password);
  });

  it('should validate known user', async () => {
    //1. create a new user and save it to database
    const newUser = await new User(fakeUser).save();
    //2. try to find this user and authenticate based on user name and password.
    const foundUser = await User.authenticateBasic(
      fakeUser.username,
      fakeUser.password
    );
    //3. expect the return user obj contains the same info.
    expect(foundUser.username).toBe(newUser.username);
  });

  it('should NOT validate unknown user or user with a bad password', async () => {
    //1. create a new user and save it to database
    await new User(fakeUser).save();
    //2. try to find this user and authenticate based on user name and BAD password.
    const withBadPassword = await User.authenticateBasic(
      fakeUser.username,
      'bad-password'
    );
    //3. expect the return is null
    expect(withBadPassword).toBeNull();
    //4. try to find a unknown user
    const withBadUserName = await User.authenticateBasic(
      'badUserName',
      fakeUser.password
    );
    //5. of course you'll get null
    expect(withBadUserName).toBeNull();
  });

  it('should generate a token', async () => {
    //1. create new user, save it, and get a token.
    await new User(fakeUser).save();
    const token = User.generateToken();
    //2. hopefully this token does exsit
    expect(token).toBeDefined();
    //3. do reverse engineering work, check what the heck it is
    const verifiedToken = jwt.verify(token, SECRET);
    //4. I hope it contains the proper info
    expect(verifiedToken.role).toBe(User.role);
    expect(verifiedToken.Username).toBe(User.username);
  });

  it('should authenticate token and find the user obj from DB', async () => {
    //1. create new user, save it, and get a token.

    console.log(fakeUser);
    let user = await new User(fakeUser).save();
    console.log(user);
    const token = User.generateToken();
    //2. hopefully this token does exist
    expect(token).toBeDefined();
    //3. do reverse engineering work with this token try to find the User Obj
    const foundUser = await User.authenticateWithToken(token);
    console.log(token);
    //4. hopefully it contains the User info
    console.log(username);
    expect(foundUser.username).toBe(User.username);
    expect(foundUser.role).toBe(User.role);

    expect(() => {
      User.authenticateWithToken('somebadtoken');
    }).toThrow('Invalid Token');
  });

  it("should save hashed password when updating user's info", async () => {
    //1. create a new user and save it to database
    const newUser = await new User(fakeUser).save();
    const newUserPass = newUser.password;

    //2. modify the password
    fakeUser.password = 'newpassword';

    const updateUser = await User.findOneAndUpdate(
      { username: newUser.username },
      { password: fakeUser.password },
      { new: true }
    );
    //3. check the username matches our fake user
    expect(updateUser.username).toBe(fakeUser.username);
    //4. check the password do NOT match the fake user.
    expect(updateUser.password).not.toBe(fakeUser.password);
    expect(updateUser.password).not.toBe(newUserPass);
  });

  // line 65-70
  it('should return a token for the queried id ', async () => {});
});
