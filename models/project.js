var mongoose = require("mongoose");
var db       = mongoose.connect("mongodb://admin:defender@ds147920.mlab.com:47920/port-nodes");
var project  = require("./db/models/project.js");

