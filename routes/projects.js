var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var fs = require('fs');
var filesTree = require('files-tree');
var PDFKit = require('pdfkit');
var blobStream = require('blob-stream');

const itemsOnPage = 6;

router.get('/', function(req, res, next) {
  if (req.query.page != undefined) {
    if (req.query.id == undefined) {

      model.project.find({}).limit(itemsOnPage).
                    skip(itemsOnPage * (req.query.page - 1)).sort({ 
                      "date": -1 
                    }).exec(function(err, data) {
                        if (err) res.redirect('/');
                        else {
                          model.project.count( 
                            function(err, len) {

                              if (err || len / itemsOnPage + 1 < req.query.page) {
                                res.redirect('/');
                                return;
                              }

                              var terminatedCounts = false,
                                  archiveCounts    = false, 
                                  checkStatusCounts = function(_all, _terminated, _archive) {
                                    if (_terminated !== false && _archive !== false) {
                                      var statusCounts = {};
                                      statusCounts.all = _all;
                                      statusCounts.active = _all - _terminated - _archive;
                                      statusCounts.terminated = _terminated;
                                      statusCounts.archive = _archive;
                                      res.render('projects', { 
                                                                title: req.cookies.username + ' projects | Project code', 
                                                                counts: statusCounts,
                                                                proj: data, 
                                                                pagination: rng
                                                              });
                                    }
                                  };

                              var rng = [];
                              for (var i = 1; i < len / itemsOnPage + 1; i++) {
                                rng.push({
                                  item: i,
                                  active: req.query.page == i ? "active" : ""
                                });
                              }

                              model.project.count({ status: "Terminated" }).exec(function(err, data) {
                                terminatedCounts = err ? 0 : data;
                                checkStatusCounts(len, terminatedCounts, archiveCounts);
                              });

                              model.project.count({ status: "Archive" }).exec(function(err, data) {
                                archiveCounts = err ? 0 : data;
                                checkStatusCounts(len, terminatedCounts, archiveCounts);
                              });
                            });
                        }
                      });
    } else {
      res.redirect('/project?page=1');
    }
  } else {
    if (req.query.id == undefined) {
      res.redirect('/project?page=1');
    } else {
      model.project.findOne(new ObjectID(req.query.id)).then(function (document) {
        var tree = filesTree.tree('./users_templates/admin/lorem');
        if (document == null) res.redirect('/project');
        else res.render('project', { title: document.title + " project", proj: document, folders: tree });
      });
    }
  }
});

router.get('/add', function(req, res) {
  res.render('project_add', { 
    title: "Add new project", 
    errors: req.query.errors ? req.query.errors.split('+') : false
  });
});

router.post('/add', function (req, res) {
  model.project.add(req.body);
  setTimeout(function () {
      res.redirect('/project');
  }, 500);
});

router.get('/settings', function(req, res) {
  if (req.query.id == undefined) {
    res.render('projects_settings', {
      title: req.cookies.username + " projects settings | Project code"
    });
  } else {
    model.project.findOne(new ObjectID(req.query.id)).
                  then(function (document) {
                    if (document == null) res.redirect('/settings');
                    else {
                      res.render('project_settings', {
                        title: document.title + " settings",
                        proj: document
                      });
                    }
                  });
  }
});

router.get('/topdf', function(req, res, next) {
  if (req.query.id) {
    model.project.findOne(new ObjectID(req.query.id)).
                  then(function (document) {
                    if (document == null) res.redirect('/project')
                    else {
                      let doc = new PDFKit;
                      let stream = doc.pipe(blobStream());

                      doc.fontSize(20).
                          text("Name of project: " + document.title);
                      doc.fontSize(15).
                          text("Status: " + document.status);
                      doc.fontSize(15).
                          text("Description: " + document.description);
                      doc.fontSize(15).
                          text("User: " + document.user);

                      doc.end();

                      res.setHeader('Content-type', 'application/pdf');
                      doc.pipe(res);
                    }
                  });
  } else {
    res.redirect('/project');
  }
});

module.exports = router;