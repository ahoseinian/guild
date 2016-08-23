'use strict';
var router = require('express').Router();
var Guild = require('../../models/guild');

router.get('/', function(req, res, next) {

  Guild.find().limit(10).exec(function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

module.exports = router;
