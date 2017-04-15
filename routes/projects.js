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
        res.render('project/projects', { 
                                  title: "Wait | Project code"
                                });
    } else {
      res.redirect('/project?page=1');
    }
  } else {
    if (req.query.id === undefined) {
      res.redirect('/project?page=1');
    } else {
      res.render('project/project', { title: "Wait | Project code", id: req.query.id });
    }
  }
});

router.get('/add', function(req, res) {
  res.render('project/project_add', { 
    title: "Add new project"
  });
});

router.get('/settings', function(req, res) {
  if (req.query.id == undefined) {
    res.render('project/project_settings', {
      title: "Wait | Project code"
    });
  } else {
    res.render('project/project_settings', {
                  titile: "Project settings | Project code",
                  id: req.query.id
              });
  }
});

router.get('/topdf', function(req, res, next) {
  if (req.query.id) {
    /*
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
      */
      res.render('project/topdf', {
        title: "Project PDF page | Project code",
        id: req.query.id
      })
  } else {
    res.redirect('/project');
  }
});

module.exports = router;