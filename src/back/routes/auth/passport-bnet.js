'use strict';
var passport = require('passport');
var BnetStrategy = require('passport-bnet').Strategy;
var BNET_ID = process.env.BNET_ID || '3ncmz34kr7ps3cemnfjuamb2xmx58acv';
var BNET_SECRET = process.env.BNET_SECRET || 'tuqAU8dKsf3zzWTwFG9mkAk3UXgUaxmG';

// Use the BnetStrategy within Passport.
passport.use(new BnetStrategy({
  clientID: BNET_ID,
  clientSecret: BNET_SECRET,
  callbackURL: 'https://localhost:3000/auth/bnet/callback',
  region: 'eu'
}, function(accessToken, refreshToken, profile, done) {
	console.log(profile);
  return done(null, profile);
}));

module.exports = passport;