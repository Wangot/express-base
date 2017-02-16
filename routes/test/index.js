var express = require('express');
var router = express.Router();

var Q = require('q');
var path = require('path');
var models = require(path.resolve("./models/orm"));

/* GET home page test. */
router.get('/', function(req, res, next) {
    res.renderLayout('test', { title: 'Express' }, 'test');
});

module.exports = router;
