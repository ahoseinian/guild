var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models/user');
var keys = require('../../../../keys');

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.

passport.use(new GoogleStrategy({
    clientID: keys.google.client.id,
    clientSecret: keys.google.client.secret,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ 'google.id': profile.id }, profile, function(err, user) {
      return done(err, user);
    });
  }

));

module.exports = passport;
