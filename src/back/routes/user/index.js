'use strict';
var router = require('express').Router();
var Guild = require('../../models/guild');
var Character = require('../../models/character');
var async = require('async');
var validator = require('../../models/validator');

router.get('/settings', function(req, res, next) {
  async.parallel({
    errors: (done) => done(null, {
      username: req.query.usernameError,
      guildname: req.query.guildnameError
    }),
    characters: (done) => Character.find({ _user: req.user }).exec(done),
    guild: (done) => Guild.findOne({ _user: req.user }).exec(done)
  }, function(err, data) {
    if (err) return next(err);
    res.render('user/settings', { data: data });
  });
});

router.post('/settings', function(req, res, next) {
  var username = req.body.username.toLowerCase();

  //return if username isn't changed
  if (req.user.username == username) return res.redirect('/user/settings');

  validator.username(username, req.user, function(err) {
    if (err) return res.redirect('/user/settings?usernameError=' + err);

    req.user.username = username;

    req.user.save(function(err) {
      if (err) return next(err);
      res.redirect('/user/settings');
    });
  });
});

router.use('/settings/characters', require('./characters'));
router.use('/settings/guild', require('./guild'));

module.exports = router;
