'use strict';
var router = require('express').Router();

router.use('/guilds', require('./guilds'));

module.exports = router;