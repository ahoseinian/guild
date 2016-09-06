var request = require('superagent');
var async = require('async');
var db = require('../src/back/db');
var Realm = require('../src/back/models/realm');
var keys = require('../keys.js');


function getRealms(region, callback) {

  var address = 'https://' + region + '.api.battle.net/wow/realm/status?locale=en_GB&apikey=' + keys.bnet.apikey;

  request
    .get(address)
    .set('Accept', 'application/json')
    .end(function(err, res) {
      if (err) return console.error(err);
      Realm.remove({ region: region }, function(err) {
        if (err) return console.error(err);
        async.each(res.body.realms, function(item, cb) {
          var realm = new Realm(item);
          realm.region = region;
          realm.save(cb);
        }, callback);
      });
    });
}

async.each(['eu', 'us'], getRealms, function(err) {
  if (err) return console.error(err);
  console.log('Everything has been saved successfully');
  db.connection.close();
});
