'use strict';

const mongoose = require('mongoose');

require('mongoose-schema-jsonschema')(mongoose);

const userSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: email, required: true },
  profile_picture: { type: String },
  written_articles: { type: String },
  following: { type: String },
  followers: { type: String },
  // UNSURE about this
  meta: {
    saved: { type: number },
    liked_articles: { type: String },
  },
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
