var mongoose = require("mongoose");
var db       = mongoose.connect("mongodb://admin:defender@ds147920.mlab.com:47920/port-nodes");
var project  = require("../db/models/project.js");

module.exports = {
    add : function (projectData) {
        return new project(rojectData).save();
    },
    
    removeOne : function (id) {
        return project.findOneAndRemove(id);
    },

    findOne : function (id) {
        return project.findOne(id);
    },

    find : function (queryData) {
        return project.find(queryData);
    }
}