'use strict';

const mongoose = require('mongoose');

const article = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  article_body: { type: String, required: true },
  image_url: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  meta: {
    viewed: Number,
    likes: Number,
  },
});

module.exports = mongoose.model('article', article);
