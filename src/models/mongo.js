'use strict';

class Model {
  constructor(model) {
    this.model = model;
  }

  create(newRecord) {
    record = new this.model(newRecord);
    return record.save();
  }

  read(id) {
    if (!id) {
      return model.find({});
    } else {
      return model.findById(id);
    }
  }
}

module.exports = Model;
