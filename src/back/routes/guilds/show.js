'use strict';
var Guild = require('../../models/guild');
var async = require('async');

module.exports = function(req, res, next) {
  async.parallel({
    item: (cb) => Guild.findOne({ guildname: req.params.guildname }).exec(cb)
  }, function(err, data) {
    if (err) return next(err);
    if (!data.item) return next();
    res.render('guilds/show', {data: data});
  });
};
