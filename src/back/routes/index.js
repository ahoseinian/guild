'use strict';
var router = require('express').Router();

router.get('/', (req, res) => res.render('index', {title: 'tes2t'}));

module.exports = router;
