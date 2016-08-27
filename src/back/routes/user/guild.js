'use strict';
var router = require('express').Router();
var Guild = require('../../models/guild');
var Request = require('../../models/request');
var validator = require('../../models/validator');
var async = require('async');

router.get('/', function(req, res, next) {
  async.parallel({
    errors: (done) => done(null, {
      username: req.query.usernameError,
      guildname: req.query.guildnameError
    }),
    guild: (cb) => Guild.findOne({ _user: req.user }).exec(cb),
  }, function(err, data) {
    if (err) return next(err);
    Request.find({ _guild: data.guild._id }).populate('_user').exec(function(err, requests) {
      data.requests = requests;
      res.render('user/guild', {
        data: data
      });
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
        res.redirect('/user/settings');
      });
    });

  });
});

// router.get('/:id/delete', function(req, res, next){
//   Character.remove({_id: req.params.id, _user: req.user}).exec(function(err){
//     if (err) return next(err);
//     res.redirect('/user/settings');
//   });
// });

module.exports = router;
