'use strict';
var router = require('express').Router();
var Guild = require('../../models/guild');
var validator = require('../../models/validator');

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
