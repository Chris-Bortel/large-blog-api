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
    enum: ['admin', 'user'],
  },
});

users.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

users.pre('findOneAndUpdate', async function () {
  this._update.password = await bcrypt.hash(this._update.password, 5);
});

users.statics.basicValidation = async function (username, password) {
  let query = { username };
  try {
    let user = await this.findOne(query);
    if (!user) return null;
    let isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  } catch (err) {
    console.error(err);
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

users.methods.validation = function (username) {
  let query = { username };
  return this.findOne(query);
};

users.statics.authenticateToken = function (token) {
  try {
    let parsedToken = jwt.verify(token, SECRET);

    return this.findById(parsedToken.id);
  } catch (e) {
    throw new Error('Invalid Token');
  }
};

module.exports = mongoose.model('users', users);
