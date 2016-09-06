'use strict';
var router = require('express').Router();
var Realm = require('../../../models/realm');

router.get('/:region?', function(req, res, next){
  Realm.find({region: req.params.region}).select('name').sort('-name').exec(function(err, items){
    if(err) return next(err);
    res.json(items);
  });
});

module.exports = router;
