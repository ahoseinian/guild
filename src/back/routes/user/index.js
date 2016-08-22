'use strict';
var router = require('express').Router();
var User = require('../../models/user');
var Character = require('../../models/character');
var async = require('async');

router.get('/settings', function(req, res, next) {
  async.parallel({
    characters: (done) => Character.find({ _user: req.user }).exec(done)
  }, function(err, data) {
    if (err) return next(err);
    res.render('user/settings', { data: data });
  });
});

router.post('/settings', function(req, res, next) {
  User.findOneAndUpdate({ _id: req.user._id }, { $set: { username: req.body.username } }).exec(function(err) {
    if (err) return next(err);
    res.redirect('/user/settings');
  });
});

router.use('/settings/characters', require('./characters'));

module.exports = router;
