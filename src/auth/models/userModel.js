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
  first_name: { type: String },
  last_name: { type: String },
  profileImgUrl: { type: String },
  // TODO: set: toLower may break things
  // email: { type: String, validate: [isEmail, 'invalid email'], set: toLower },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'editor', 'admin'],
  },
});
// Virtuals

users.virtual('token').get(function () {
  let tokenObject = {
    username: this.username,
  };
  return jwt.sign(tokenObject, SECRET);
});

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

users.methods.tokenGenerator = function () {
  let token = {
    id: this._id,
    username: this.username,
    role: this.role,
    // capabilities: this.capabilities,
  };
  return jwt.sign(token, SECRET);
};
// TODO: Need to test
users.methods.validation = function (username) {
  let query = { username };
  return this.findOne(query);
};

// TODO: Test and refactor to account for a user not being found
// Test for throwing an 'Invalid Token' error message

users.statics.authenticateWithToken = function (token) {
  try {
    let parsedToken = jwt.verify(token, SECRET);

    return this.findById(parsedToken.id);
  } catch (e) {
    throw new Error('Invalid Token');
    // throw new Error(e.message)
  }
};

module.exports = mongoose.model('users', users);
