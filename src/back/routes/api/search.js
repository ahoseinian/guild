'use strict';
var router = require('express').Router();
var Guild = require('../../models/guild');
var async = require('async');

router.get('/', function(req, res, next) {
  var name = req.query.name ? req.query.name.trim() : null;
  var query = {};
  if (name) {
    query['$or'] = [
      { guildname: new RegExp('.*' + name + '.*', 'i') },
      { name: new RegExp('.*' + name + '.*', 'i') },
    ];
  }
  if(req.query.region){
    query.region = req.query.region;
  }
  if(req.query.realm){
    query.realm = req.query.realm;
  }
  async.parallel({
    guilds: (cb) => Guild.find(query).exec(cb)
  }, function(err, data) {
    if (err) return next(err);
    res.json(data);
  });

});

module.exports = router;
