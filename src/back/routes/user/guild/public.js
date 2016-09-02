var formidable = require('formidable');
var async = require('async');
var Image = require('../../../models/image');
var Guild = require('../../../models/guild');
module.exports = function(req, res, next) {
  var form = new formidable.IncomingForm();
  async.autoInject({
    form: (cb) => form.parse(req, cb),
    images: (form, cb) => {
      form[1].image.saveSize = 400;
      Image.saveImage(form[1], cb);
    },
    guild: (form, images, cb) => {
      Guild.findOne({ _user: req.user }, function(err, item) {
        item.public.text = form[0]['public.text'];
        if (images[0]) item._image = images[0]._id;
        item.save(cb);
      });
    },
  }, function(err) {
    if (err) return next(err);
    res.redirect('/user/settings/guild');
  });
};
