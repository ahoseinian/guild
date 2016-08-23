'use strict';
var User = require('./user');
var Guild = require('./guild');
var async = require('async');


module.exports = {
  username: function(v, user, done) {
    if (!v.match(/^[a-z0-9_-]{3,16}$/)) return done('Available characters  a-z 0-9 _ -');

    async.parallel({
      user: (cb) => User.findOne({ username: v }).exec(cb),
      guild: (cb) => Guild.findOne({ guildname: v }).exec(cb),
    }, function(err, data) {
      console.log(data);
      if (err) return done('Server error please try agian');
      if (!data.user && !data.guild) return done(null); //it is free
      if (data.user && data.user._id.toString() == user._id.toString()) return done(null); // it is for current user
      if (data.guild && data.guild._user.toString() == user._id.toString()) return done(null); // it is for current user
      return done(v + ' is Taken');
    });

  },
};
