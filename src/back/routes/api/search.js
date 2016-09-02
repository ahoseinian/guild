'use strict';
var router = require('express').Router();
var Guild = require('../../models/guild');
var async = require('async');

router.get('/', function(req, res, next) {
  var qry = req.query.query.trim();
  if (!qry) return res.json({ guilds: [] });
  async.parallel({
    guilds: (cb) => Guild.find({
      $or: [
        { guildname: new RegExp('.*' + qry + '.*', 'i') },
        { name: new RegExp('.*' + qry + '.*', 'i') },
      ]
    }).exec(cb)
  }, function(err, data) {
    if (err) return next(err);
    res.json(data);
  });

});

module.exports = router;
