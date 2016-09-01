'use strict';
var router = require('express').Router({ mergeParams: true });
var Message = require('../../../models/message');
var Image = require('../../../models/image');
var formidable = require('formidable');
var async = require('async');
var auth = require('../../auth/authorize');



router.get('/', function(req, res, next) {
  Message
    .find({ _guild: req.params.guildId, hidden: false })
    .populate('_user _images')
    .sort('-_id')
    .exec(function(err, items) {
      if (err) return next(err);
      res.json(items);
    });
});

router.post('/', auth.isLoggedIn, function(req, res, next) {
  var form = new formidable.IncomingForm({ type: true });
  form.parse(req, function(err, fields, files) {
    var msg = new Message({
      text: fields.text,
      _user: req.user,
      _guild: req.user._guild
    });
    Image.saveImage(files, function(err, imgs) {
      if (err) return next(err);
      if (imgs.length) {
        msg._images = msg._images.concat(imgs);
      }
      msg.save(function(err, item) {
        if (err) return next(err);
        Message.populate(item, { path: '_images' }, function(err, item) {
          if (err) return next(err);
          res.json(item);
        });
      });
    });
  });

});

router.delete('/:id', auth.isLoggedIn, function(req, res, next) {
  async.autoInject({
    message: (cb) => Message.findOne({ _id: req.params.id, _user: req.user }).exec(cb),
    hide: function(message, cb) {
      message.hidden = true;
      message.save(cb);
    }
  }, function(err) {
    if (err) return next(err);
    res.json({ status: 'ok' });
  });

});

module.exports = router;
