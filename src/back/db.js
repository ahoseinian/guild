'use strict';
var db = require('mongoose');
db.connect('mongodb://localhost/guild');

module.exports = db;