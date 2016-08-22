'use strict';
var router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/user', require('./auth/authorize').isLoggedIn, require('./user'));
router.get('/', (req, res) => res.render('index', { title: 'tes2t' }));

module.exports = router;
