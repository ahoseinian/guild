var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  text: { type: String, default: '' },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _guild: { type: mongoose.Schema.Types.ObjectId, ref: 'Guild' },
  date: { type: Date, default: Date.now },
  _images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
  hidden: { type: Boolean, default: false },
}, {
  toJSON: {
    virtuals: true
  }
});

module.exports = mongoose.model('Message', Schema);
