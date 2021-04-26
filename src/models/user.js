'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const UserSchema = mongoose.Schema({
  first_name: { type: string, Required },
  last_name: { type: string, Required },
  email: { type: email },
  written_articles: { type: string },
  following: { type: string },
  followers: { type: string },
  // UNSURE about this
  // meta: {
  //   saved: { type: number },
  //   liked_articles: { type: string },
  // },
});
