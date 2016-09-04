'use strict';
var router = require('express').Router();
var async = require('async');
var Guild = require('../../../models/guild');
var User = require('../../../models/user');
var Request = require('../../../models/request');
var validator = require('../../../models/validator');

router.get('/', function(req, res, next) {
  async.autoInject({
    errors: (done) => done(null, {
      username: req.query.usernameError,
      guildname: req.query.guildnameError
    }),
    guild: (cb) => Guild.findOne({ _user: req.user }).populate('_image').exec(function(err, item) {
      if (!item) return cb(null, new Guild());
      return cb(null, item);
    }),
    requests: (guild, cb) => Request.find({ _guild: guild._id, state: 0 }).populate('_user').exec(cb),
    users: (guild, cb) => User.find({ _guild: guild._id }).exec(cb),
  }, function(err, data) {
    if (err) return next(err);
    res.render('user/guild/index', {
      data: data
    });
  });
});

router.post('/', function(req, res, next) {
  var guildname = req.body.guildname.toLowerCase();

  validator.username(guildname, req.user, function(err) {
    if (err) return res.redirect('/user/settings/guild?guildnameError=' + err);

    Guild.findOne({ _user: req.user }).exec(function(err, guild) {
      if (guild) {
        guild.guildname = guildname;
        guild.name = req.body.name;
        guild.region = req.body.region;
        guild.realm = req.body.realm;
      } else {
        guild = new Guild(req.body);
        guild._user = req.user;
      }
      guild.save(function(err) {
        if (err) return next(err);
        req.user._guild = guild;
        req.user.save(function(err) {

          if (err) return next(err);
          res.redirect('/user/settings/guild');
        });
      });
    });

  });
});

router.get('/r/:id/:type', function(req, res, next) {
  var state = req.params.type == 'accept' ? 1 : 2;
  var userId, guildId;
  async.series([
    function(cb) {
      Request.findById(req.params.id, function(err, r) {
        if (err) return next(err);
        userId = r._user;
        guildId = r._guild;
        r.state = state;
        r.save(cb);
      });
    },
    function(cb) {
      if (state == 2) return cb(null);
      User.findById(userId, function(err, user) {
        if (err) return next(err);
        user._guild = guildId;
        user.save(cb);
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/user/settings/guild');
  });
});

//remove user from guild
router.get('/u/:id/delete', function(req, res, next) {
  User.findOne({ _id: req.params.id, _guild: req.user._guild }, function(err, user) {
    if (user == req.user) return res.redirect('/user/settings/guild'); //cant delete owner
    if (!user) return next(); //404
    if (err) return next(err);
    user._guild = undefined;
    user.save(function(err) {
      if (err) return next(err);
      res.redirect('/user/settings/guild');
    });
  });
});

router.get('/remove', function(req, res, next) {
  async.series([
    (cb) => User.update({ _guild: req.user._guild }, { $unset: { '_guild': 1 } }).exec(cb),
    (cb) => Guild.remove({ _id: req.user._guild }).exec(cb)
  ], function(err) {
    if (err) return next(err);
    res.redirect('/user/settings');
  });
});

router.post('/public', require('./public'));
router.post('/private', require('./private'));

module.exports = router;
