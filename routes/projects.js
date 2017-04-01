var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.query.id == undefined) {
    model.project.find(function (err, cursor) {
      if (err) res.redirect('/');
      else {
        res.render('projects', { title: 'Project list', proj: cursor.sort({ "title": -1 }) });
      }
    });
  }
  else {
    model.project.findOne(req.query.id).then(function (document) {
      if (document == null) res.redirect('/project');
      else res.render('project', { title: document.title + " project", proj: document });
    });
  }
});

router.post('/', function (req, res) {
  console.log(req.body);
  model.project.add(req.body, function (document) {
    res.json(document);
  });
});

module.exports = router;