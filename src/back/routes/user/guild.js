'use strict';
var router = require('express').Router();
var Guild = require('../../models/guild');
var User = require('../../models/user');
var Request = require('../../models/request');
var validator = require('../../models/validator');
var async = require('async');

router.get('/', function(req, res, next) {
  async.autoInject({
    errors: (done) => done(null, {
      username: req.query.usernameError,
      guildname: req.query.guildnameError
    }),
    guild: (cb) => Guild.findOne({ _user: req.user }).exec(cb),
    requests: (guild, cb) => Request.find({ _guild: guild._id, state: 0 }).populate('_user').exec(cb),
    users: (guild, cb) => User.find({ _guild: guild._id }).exec(cb),
  }, function(err, data) {
    if (err) return next(err);
    res.render('user/guild', {
      data: data
    });
  });
});

router.post('/', function(req, res, next) {
  var guildname = req.body.guildname.toLowerCase();

  validator.username(guildname, req.user, function(err) {
    if (err) return res.redirect('/user/settings?guildnameError=' + err);

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

// router.get('/:id/delete', function(req, res, next){
//   Character.remove({_id: req.params.id, _user: req.user}).exec(function(err){
//     if (err) return next(err);
//     res.redirect('/user/settings');
//   });
// });

module.exports = router;
