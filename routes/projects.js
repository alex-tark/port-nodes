var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.query.id == undefined) {
    model.project.find()
    res.render('index', { title: 'Project list' });
  }
  else {
    model.project.findOne(req.query.id).then(function (document) {
      if (document == null) res.redirect('/project');
      else res.json(document);
    });
  }
});

router.post('/project', function (req, res) {
  project.add(req.body, function (document) {
    res.json(document);
  });
});

module.exports = router;