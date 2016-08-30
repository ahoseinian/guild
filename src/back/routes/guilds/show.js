'use strict';
var Guild = require('../../models/guild');
var Request = require('../../models/request');
var async = require('async');

module.exports = function(req, res, next) {
  async.autoInject({
    item: function(cb) {
      Guild.findOne({ guildname: req.params.guildname }).exec(function(err, item) {
        if (!item) return next(); //404
        return cb(err, item);
      });
    },
    requested: function(item, cb) {
      Request.count({ _guild: item._id, _user: req.user }).exec(cb);
    },
  }, function(err, data) {
    if (err) return next(err);
    res.render('guilds/show', { data: data });
  });
};
