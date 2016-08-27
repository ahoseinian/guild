'use strict';
var router = require('express').Router();

router.use('/user', require('./auth/authorize').isLoggedIn, require('./user'));

router.use('/auth', require('./auth'));
router.use('/guilds', require('./guilds'));
router.use('/api', require('./api'));

router.get('/', (req, res) => res.render('index', { title: 'tes2t' }));
router.get('/:guildname', require('./guilds/show'));

module.exports = router;
