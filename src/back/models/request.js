var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  text: String,
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _guild: { type: mongoose.Schema.Types.ObjectId, ref: 'Guild' },
  state: { type: Number, default: 0 },
}, {
  toJSON: {
    virtuals: true
  }
});

module.exports = mongoose.model('Request', Schema);
