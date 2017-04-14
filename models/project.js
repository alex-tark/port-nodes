var mongoose = require("mongoose");
var project  = require("../db/models/project.js");

module.exports = {
    add : function (projectData) {
        return new project(projectData).save();
    },
    
    removeOne : function (id) {
        return project.findOneAndRemove(id);
    },

    findOne : function (id) {
        return project.findOne(id);
    },

    find : function (queryData) {
        return project.find(queryData);
    },

    count : function (projectData) {
        return project.count(projectData);
    }
}