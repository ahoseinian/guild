var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  type: String,
  population: String,
  name: String,
  locale: String,
  timezone: String,
  region: String,
}, {
  toJSON: {
    virtuals: true
  }
});

module.exports = mongoose.model('Realm', Schema);
