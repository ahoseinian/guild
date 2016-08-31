var mongoose = require('mongoose');
var lwip = require('lwip');
var async = require('async');

var Schema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
}, {
  toJSON: {
    virtuals: true
  }
});

Schema.statics.saveImage = function(files, cb) {
  var _this = this;
  async.map(files, function(file, callback) {

    var imageRecord = new _this();

    lwip.open(file.path, file.type.split('/')[1].toUpperCase(), function(err, img) {
      if (err) return cb(err);
      var ratio = 500 / img.width();
      img.batch().scale(ratio).writeFile(__dirname + '/../../storage/images/' + imageRecord._id + '.jpg', 'jpg', { quality: 60 }, function(err) {
        if (err) return cb(err);
        imageRecord.save(callback);
      });
    });

  }, cb);
};


var prefix = process.env.NODE_ENV == 'production' ? 'http://cdn.bazivision.com' : '';
Schema.virtual('url').get(function() {
  return prefix + '/storage/images/' + this._id + '.jpg';
});

module.exports = mongoose.model('Image', Schema);
