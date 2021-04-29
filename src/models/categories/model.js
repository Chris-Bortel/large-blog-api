'use strict';

const mongoose = require('mongoose');

require('mongoose-schema-jsonschema')(mongoose);

/* Categories are going to be pre loaded and users will be able to select what category their article will be saved under. This will also allow users to search for articles that they are wanting to view.
 */

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  description: String,
});

const categoryModel = mongoose.model('categories', categorySchema);

module.exports = categoryModel;
