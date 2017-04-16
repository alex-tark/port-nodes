var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Project code' });
});

router.get('/start', function(req, res, next) {
  res.render('helpers/start', { title: "Get started with Project manager | Project code" });
});

module.exports = router;
