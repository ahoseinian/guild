'use strict';
var express = require('express');
var router = express.Router();
var passport = require('./passport');
var passportGoogle = require('./passport-google');
// var passportBnet = require('./passport-bnet');
// var User = require('../../models/user');


router.get('/google',
  passportGoogle.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


router.get('/logout', function(req, res) {
  req.logOut();
  res.redirect('/');
});

// router.get('/signup', function(req, res) {
//   res.render('auth/signup', {
//     message: req.query.message
//   });
// });


// router.get('/signup', (req, res) => res.render('auth/signup'));

// router.get('/bnet', passportBnet.authenticate('bnet'));
// router.get('/bnet/callback', passportBnet.authenticate('bnet', { failureRedirect: '/' }), (req, res) => res.redirect('/'));

// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/?error',
//   failureFlash: true // allow flash messages
// }));


// // process the signup form
// router.post('/signup', function(req, res, next) {
//   passport.authenticate('local-signup', function(err, user, info) {
//     if (err) return next(err);

//     if (!user) {
//       return res.redirect('/auth/signup?message=' + encodeURIComponent(info.message));
//     }
//     req.login(user, function(loginErr) {
//       if (loginErr) return next(loginErr);
//       return res.redirect('/');
//     });
//   })(req, res, next);

// });

// router.get('/email/:email/free', function(req, res, next) {
//   User.findOne({
//     email: req.params.email
//   }, function(err, user) {
//     if (err) return next(err);
//     res.json({
//       success: !user
//     });
//   });
// });

module.exports = router;
