'use strict';

// This takes in a schema and builds the REST methodology. Will be connected through the router

class DataCollection {
  constructor(model) {
    this.model = model;
  }

  get(_id) {
    if (_id) {
      return this.model.findOne({ _id });
    } else {
      return this.model.find({});
    }
  }

  create(record) {
    let newRecord = this.model(record);
    return newRecord.save();
  }

  update(_id, record) {
    return this.model.findOneAndUpdate(_id, record, { new: true });
  }

  delete(_id) {
    return this.model.findOneAndDelete(_id);
  }
}

module.exports = DataCollection;
