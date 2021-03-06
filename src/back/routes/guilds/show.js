'use strict';
var Guild = require('../../models/guild');
var Request = require('../../models/request');
var async = require('async');

module.exports = function(req, res, next) {
  async.autoInject({
    item: function(cb) {
      Guild.findOne({ guildname: req.params.guildname }).populate('_image').exec(function(err, item) {
        if (!item) return next(); //404
        return cb(err, item);
      });
    },
    requested: function(item, cb) {
      Request.count({ _guild: item._id, _user: req.user, state: 0 }).exec(cb);
    },
    page: (item, cb) => cb(null, {
      title: item.guildname,
      desc: item.guildname + ' ' + item.region + ' ' + item.realm
    })
  }, function(err, data) {
    if (err) return next(err);
    res.render('guilds/show', {
      data: data,
      page: data.page
    });
  });
};
