'use strict';
var router = require('express').Router();

router.use('/guilds', require('./guilds'));
router.use('/search', require('./search'));

module.exports = router;