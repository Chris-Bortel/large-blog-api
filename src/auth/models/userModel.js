'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const isEmail = require('validator').isEmail;
const SECRET = process.env.SECRET;

const users = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'editor', 'admin'],
  },
  // TODO: Needs to go into a separate model
  // first_name: { type: String },
  // last_name: { type: String },
  // profileImgUrl: { type: String },
  // TODO: set: toLower may break things
  // email: { type: String, validate: [isEmail, 'invalid email'], set: toLower },
});
// Virtuals

// TODO: Since I have this set up as a virtual, do I need id and role? Theoretically, they should be attached to the capabilities
users.virtual('token').get(function () {
  let tokenObject = {
    id: this._id,
    username: this.username,
    role: this.role,
  };
  return jwt.sign(tokenObject, SECRET);
});

// TODO: Do I want the additional properties attached to the token object?
// users.methods.tokenGenerator = function () {
//   let token = {
//     id: this._id,
//     username: this.username,
//     role: this.role,
//     // capabilities: this.capabilities,
//   };
//   return jwt.sign(token, SECRET);
// };

users.virtual('capabilities').get(function () {
  let acl = {
    user: ['read'],
    editor: ['read', 'create', 'update'],
    admin: ['read', 'create', 'update', 'delete'],
  };
  return acl[this.role];
});

users.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

users.pre('findOneAndUpdate', async function () {
  this._update.password = await bcrypt.hash(this._update.password, 5);
});

users.methods.can = function (capability) {
  return roles[this.role].includes(capability);
};

users.statics.generateToken = function () {
  let tokenObject = {
    username: this.username,
    role: this.role,
    // permissions: role[this.role],
  };
  let token = jwt.sign(tokenObject, process.env.SECRET);
  return token;
};
/**
 * This async function will take a user name and password as two params, query the database with the user name, try to find a match. If no match is found, we have NULL as the return of the entire function;
 * If a user if found, it will compare the given plain password with the user's encrypted password and get a boolean as result.
 * If valid, return the user obj, otherwise return null.
 * @param {string} username
 * @param {string} password
 */
users.statics.authenticateBasic = async function (username, password) {
  let query = { username };
  try {
    let user = await this.findOne(query);
    if (!user) return null;
    let isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  } catch (err) {
    //TODO: Need to test
    throw new Error('Invalid User');
  }
};

// TODO: Need to test
// users.static.validation = function (username) {
//   let query = this.findOne({ username });
//   return this.findOne(query);
// };

// TODO: Test and refactor to account for a user not being found
// Test for throwing an 'Invalid Token' error message

users.statics.authenticateWithToken = function (token) {
  try {
    const parsedToken = jwt.verify(token, SECRET);
    console.log('Parsed Token!!!!!!!!!', parsedToken);
    const user = this.findOne({ username: parsedToken.username });
    if (user) {
      return user;
    }
    // return this.findById(parsedToken.id);
  } catch (e) {
    throw new Error('Invalid Token');
    // throw new Error(e.message)
  }
};

module.exports = mongoose.model('users', users);
