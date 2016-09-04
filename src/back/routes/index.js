'use strict';
var router = require('express').Router();
var async = require('async');
var Request = require('../models/request');


router.get('/', function(req, res, next) {
  async.parallel({
    requestsCount: (cb) => {
      if (!req.user) return cb(null, null);
      Request.count({ _guild: req.user._guild._id, state: 0 }).populate('_user').exec(cb);
    },
  }, function(err, data) {
    if (err) return next(err);
    res.render('index', { data: data });
  });
});



router.use('/user', require('./auth/authorize').isLoggedIn, require('./user'));
router.use('/auth', require('./auth'));
router.use('/api', require('./api'));
router.get('/:guildname', require('./guilds/show'));

module.exports = router;
