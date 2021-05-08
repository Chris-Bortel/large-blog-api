'use strict';

const mongoose = require('mongoose');

require('mongoose-schema-jsonschema')(mongoose);

const articleSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  article_body: { type: String },
  category: { type: String, required: true },
  // image_url: String,
  // comments: [{ body: String, date: Date }],
  // date: { type: Date, default: Date.now },
  // meta: {
  //   viewed: Number,
  //   likes: Number,
  // },
});

const articleModel = mongoose.model('article', articleSchema);

module.exports = articleModel;
