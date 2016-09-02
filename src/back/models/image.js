var mongoose = require('mongoose');
var lwip = require('lwip');
var async = require('async');

var Schema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  size: { type: Number, default: 500 },
}, {
  toJSON: {
    virtuals: true
  }
});

Schema.statics.saveImage = function(files, size, cb) {
  var args = [];
  for (var i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  cb = args.pop();
  files = args[0];
  size = args.length == 2 ? args[1] : 500;

  var _this = this;
  async.map(files, function(file, callback) {
    if (!file.size) return callback(null, null);
    var imageRecord = new _this();
    if (file.saveSize) imageRecord.size = file.saveSize;

    lwip.open(file.path, file.type.split('/')[1].toUpperCase(), function(err, img) {
      if (err) return cb(err);
      var ratio = imageRecord.size / img.width();
      img
        .batch()
        .scale(ratio)
        .writeFile(__dirname + '/../../storage/images/' + imageRecord._id + '.jpg', 'jpg', { quality: 60 }, function(err) {
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
