'use strict';
var router = require('express').Router();
var Character = require('../../models/character');

router.post('/', function(req, res, next) {
  var character = new Character(req.body);
  character._user = req.user;

  character.save(function(err) {
    if (err) return next(err);
    res.redirect('/user/settings');
  });
});

router.get('/:id/delete', function(req, res, next){
  Character.remove({_id: req.params.id, _user: req.user}).exec(function(err){
    if (err) return next(err);
    res.redirect('/user/settings');
  });
});

module.exports = router;
