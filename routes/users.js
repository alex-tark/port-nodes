var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.cookies.auth) {
    res.render('index', { title: req.cookies.username + " profile" });
  } else {
    res.redirect('/user/signin');
  }
});

router.get('/signin', function(req, res, next) {
  if (req.cookies.auth) {
    res.redirect('/user');
  } else {
    res.render('signin', { title: "Sign In now", errors: false });
  }
});

router.get('/signup', function(req, res, next) {
  if (req.cookies.auth) {
    res.redirect('/user');
  } else {
    res.render('signin', { title: "Sign Up now" });
  }
});

module.exports = router;
