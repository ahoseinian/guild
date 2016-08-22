var mongoose = require('mongoose');
var keys = require('../../../keys.js');
var request = require('superagent');

var Schema = new mongoose.Schema({
  region: { type: String, required: true },
  realm: { type: String, required: true },
  name: { type: String, required: true },
  bnet: mongoose.Schema.Types.Mixed,
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  toJSON: {
    virtuals: true
  }
});

Schema.virtual('bnet-address').get(function() {
  return 'https://' + this.region + '.api.battle.net/wow/character/' + this.realm + '/' + this.name + '?locale=en_GB&apikey=' + keys.bnet.apikey;
});

Schema.post('save', function(doc) {
  var address = 'https://' + doc.region + '.api.battle.net/wow/character/' + doc.realm + '/' + doc.name + '?locale=en_GB&apikey=' + keys.bnet.apikey;
  request
    .get(address)
    .set('Accept', 'application/json')
    .end(function(err, res) {
      doc.bnet = res.body;
      doc.save();
      // Calling the end function will send the request
    });
});

module.exports = mongoose.model('Character', Schema);
