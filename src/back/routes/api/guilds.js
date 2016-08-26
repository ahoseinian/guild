'use strict';
var router = require('express').Router();
var Guild = require('../../models/guild');

router.get('/:guildname', function(req, res, next) {
  Guild.findOne({ guildname: req.params.guildname }, function(err, item) {
    if (err) return next(err);
    res.json(item);
  });
});

module.exports = router;
