var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
// var sanitizeHtml = require('sanitize-html');

var Schema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    sparse: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  fullname: {
    type: String,
    maxlength: 40
  },
  // password: String,
  google: mongoose.Schema.Types.Mixed,
  _guild: { type: mongoose.Schema.Types.ObjectId, ref: 'Guild' },
}, {
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.google;
      delete ret.email;
      return ret;
    }
  }
});

Schema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

Schema.methods.validPassword = function(password) {
  return this.password && bcrypt.compareSync(password, this.password);
};

Schema.statics.findOrCreate = function(query, profile, done) {
  var User = this;
  return this.findOne(query, function(err, user) {
    if (err) return done(err);
    if (!user) {
      user = new User({
        email: profile.emails[0].value,
        google: profile._json
      });

    } else {
      user.google = profile._json;
    }

    user.save(function(err) {
      if (err) return done(err);
      return done(err, user);
    });
  });
};

Schema.virtual('displayName').get(function() {
  return this.fullname || this.google.displayName;
});

Schema.virtual('info').get(function() {
  return {
    img: this.google ? this.google.image.url : '/images/default-profile.png'
  };
});

Schema.pre('findOne', function(next) {
  this.populate('_guild', 'guildname');
  next();
});
module.exports = mongoose.model('User', Schema);
