'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isEmail = require('validator').isEmail;
const SECRET = process.env.SECRET;

const user = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String },
  last_name: { type: String },
  profileImgUrl: { type: String },
  // TODO: set: toLower may break things
  email: { type: String, validate: [isEmail, 'invalid email'], set: toLower },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['admin', 'user'],
  },
});
