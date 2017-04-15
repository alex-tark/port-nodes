var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('user/index', { title: " profile" });
});

router.get('/signin', function(req, res, next) {
  res.render('user/signin', { title: "Sign In now" });
});

router.get('/signup', function(req, res, next) {
  res.render('user/signup', { title: "Sign Up now" });
});

router.get('/settings', function(req, res, next) {
  res.render('user/settings', { title: "User settings" });
})

module.exports = router;
