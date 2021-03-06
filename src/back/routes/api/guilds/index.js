'use strict';
var router = require('express').Router();
var auth = require('../../auth/authorize');
var Guild = require('../../../models/guild');
var Request = require('../../../models/request');
var async = require('async');

router.get('/', function(req, res, next) {
  Guild.find().populate('_user').limit(10).exec(function(err, items) {
    if (err) return next(err);
    res.json(items);
  });
});

router.get('/:guildname', function(req, res, next) {
  Guild.findOne({ guildname: req.params.guildname }).populate('_image').exec(function(err, item) {
    if (err) return next(err);
    res.json(item);
  });
});

router.post('/:guildId/join', auth.isLoggedIn, function(req, res, next) {
  async.parallel({
    requestCounts: (cb) => Request.count({ _user: req.user }).exec(cb),
    alreadyRequested: (cb) => Request.count({ _user: req.user, _guild: req.params.guildId, state:0 }).exec(cb),
  }, function(err, data) {
    if (err) return next(err);
    if (data.alreadyRequested) return res.status(400).json({ message: 'Already Voted' });
    if (data.requestCounts > 10) return res.status(400).json({ message: 'You have more than 10 active requests. we Can\'t do more than that at this time sry...' });

    var newR = new Request({
      _user: req.user,
      _guild: req.params.guildId,
      text: req.body.text
    });
    newR.save(function(err) {
      if (err) return next(err);
      res.json({ message: 'Thank you for your interest we will get back to you as soon as possible' });
    });
  });
});

router.get('/:guildId/requests/count', auth.isLoggedIn, function(req, res,next){
  async.autoInject({
    userGuild: (cb) => Guild.findOne({_user: req.user}).exec(cb),
    count: (userGuild, cb) => {
      if (!userGuild) return cb(null, null);
      Request.count({_guild: userGuild._id, state:0}).exec(cb);
    }
  }, function(err, data){
    if (err) return next(err);
    res.json(data);
  });
});

router.use('/:guildId/members', require('./members'));
router.use('/:guildId/board', require('./board'));

module.exports = router;
