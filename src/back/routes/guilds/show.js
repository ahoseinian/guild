'use strict';
var Guild = require('../../models/guild');
var Request = require('../../models/request');
var async = require('async');

module.exports = function(req, res, next) {
  async.parallel({
    item: (cb) => Guild.findOne({ guildname: req.params.guildname }).exec(cb)
  }, function(err, data) {
    if (err) return next(err);
    if (!data.item) return next();
    Request
      .count({ _guild: data.item._id, _user: req.user })
      .exec(function(err, count) {
        data.requested = count;
        res.render('guilds/show', { data: data });
      });
  });
};
