var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Project code' });
});

module.exports = router;
