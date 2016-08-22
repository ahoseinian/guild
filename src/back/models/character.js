var mongoose = require('mongoose');
var keys = require('../../../keys.js');

var Schema = new mongoose.Schema({
  region: { type: String, required: true },
  realm: { type: String, required: true },
  name: { type: String, required: true },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  toJSON: { 
    virtuals: true
  }
});

Schema.virtual('addres').get(function() {
  return 'https://' + this.region + '.api.battle.net/wow/character/' + this.realm + '/' + this.name + '?locale=en_GB&apikey=' + keys.bnet.apikey;
});

module.exports = mongoose.model('Character', Schema);
