var mongoose = require('mongoose');
var keys = require('../../../keys.js');
var request = require('superagent');

var Schema = new mongoose.Schema({
  guildname: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    sparse: true,
  },
  region: { type: String, required: true },
  realm: { type: String, required: true },
  name: { type: String, required: true },
  bnet: mongoose.Schema.Types.Mixed,
  public: { text: String },
  private: { text: String },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
}, {
  toJSON: {
    virtuals: true
  }
});

Schema.post('save', function(doc) {
  console.log('fetching from bnet');
  var address = 'https://' + doc.region + '.api.battle.net/wow/guild/' + doc.realm + '/' + doc.name + '?locale=en_GB&apikey=' + keys.bnet.apikey;
  try {
    request
      .get(address)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        doc.bnet = res.body;
        doc.save();
      });
  } catch (e) {
    console.error(e);
  }
});

Schema.virtual('url').get(function() {
  return {
    api: '/api/guilds/' + this._id
  };
});


module.exports = mongoose.model('Guild', Schema);
