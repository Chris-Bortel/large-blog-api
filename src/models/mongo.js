'use strict';

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  create(newRecord) {
    record = new schema(newRecord);
    return record.save();
  }

  read(id) {
    if (!id) {
      return schema.find({});
    } else {
      return schema.findById(id);
    }
  }
}

module.exports = Model;
