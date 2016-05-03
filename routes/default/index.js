var express = require('express');
var router = express.Router();

var Q = require('q');
var path = require('path');
var models = require(path.resolve("./models/orm"));

// require('./sub-folder')(router);

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    res.renderLayout('home', { title: 'Express' });
});

/* Checker if system is alive */
router.get('/check', function(req, res){
    res.end('ok');
});

module.exports = router;