'use strict';
var express = require('express');
var router = express.Router();
var passport = require('./passport');
var passportGoogle = require('./passport-google');
// var passportBnet = require('./passport-bnet');
// var User = require('../../models/user');


router.get('/login', (req, res) => res.render('auth/login', { error: req.query.error }));

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login?error=true'
}));

router.get('/signup', (req, res) => res.render('auth/signup', { error: req.query.error }));

router.post('/signup', function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) return next(err);

    if (!user) {
      return res.redirect('/auth/signup?error=' + encodeURIComponent(info.message));
    }
    req.login(user, function(loginErr) {
      if (loginErr) return next(loginErr);
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/google',
  passportGoogle.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    if (req.user.password) {
      return res.redirect('/');
    }
    res.redirect('/auth/password');
  });



router.get('/logout', function(req, res) {
  req.logOut();
  setTimeout(function() {
    res.redirect('/');
  }, 50);
});

router.get('/password', require('./authorize').isLoggedIn, function(req, res) {
  res.render('auth/password', { error: req.query.error });
});

router.post('/password', require('./authorize').isLoggedIn, function(req, res, next) {
  if (req.body.password == req.body.confirm_password) {
    req.user.password = req.user.generateHash(req.body.password);
    req.user.save(function(err) {
      if (err) return next(err);
      return res.redirect('/');
    });
  } else {
    res.redirect('/auth/password?error=Passwords Don\'t Match');
  }

});




// router.get('/signup', (req, res) => res.render('auth/signup'));

// router.get('/bnet', passportBnet.authenticate('bnet'));
// router.get('/bnet/callback', passportBnet.authenticate('bnet', { failureRedirect: '/' }), (req, res) => res.redirect('/'));




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
