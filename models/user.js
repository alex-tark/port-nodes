var mongoose = require("mongoose");
var user     = require("../db/models/user.js");

module.exports = {
    add : function (userData) {
        return new user(projectData).save();
    },
    
    removeOne : function (id) {
        return user.findOneAndRemove(id);
    },

    findOne : function (id) {
        return user.findOne(id);
    },

    find : function (queryData) {
        return user.find(queryData);
    }
}