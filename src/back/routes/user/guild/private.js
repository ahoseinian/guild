'use strict';
var Guild = require('../../../models/guild');
module.exports = function(req, res, next) {
  Guild.findOne({ _user: req.user }, function(err, item) {
    console.log(req.body);
    item.private.text = req.body['private.text'];
    item.save(function(err) {
      if (err) return next(err);
      res.redirect('/user/settings/guild');
    });
  });
};
