'use strict';
var Guild = require('../../models/guild');
var Request = require('../../models/request');
var async = require('async');

module.exports = function(req, res, next) {
  async.autoInject({
    item: (cb) => Guild.findOne({ guildname: req.params.guildname }).exec(cb),
    requested: (item, cb) => Request.count({ _guild: item._id, _user: req.user }).exec(cb)
  }, function(err, data) {
    if (err) return next(err);
    if (!data.item) return next();
    res.render('guilds/show', { data: data });
  });
};
