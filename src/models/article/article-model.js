'use strict';

const Model = require('../mongo.js');
const schema = require('./article-schema.js');

class Article extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Article;
