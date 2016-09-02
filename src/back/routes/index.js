'use strict';
var router = require('express').Router();


router.get('/', function(req, res) {
  res.render('index');
});



router.use('/user', require('./auth/authorize').isLoggedIn, require('./user'));
router.use('/auth', require('./auth'));
router.use('/api', require('./api'));
router.get('/:guildname', require('./guilds/show'));

module.exports = router;
