var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: "Sign in please" });
});

router.post('/', function(req, res) {
  if (req.cookies.user) res.redirect('/');
  else {
    model.user.findOne({ "login": req.body.login }).then(function (err, user) {
      if (err) res.redirect('/');
      else {
        if (user == undefined) {

        }
      }
    });
  }
});

module.exports = router;
