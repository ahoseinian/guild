'use strict';
var router = require('express').Router({ mergeParams: true });
var User = require('../../../models/user');

router.get('/', function(req, res, next) {
  User.find({ _guild: req.params.guildId }, function(err, users) {
    if (err) return next(err);
    res.json(users);
  });
});


module.exports = router;
