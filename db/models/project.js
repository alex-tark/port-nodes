var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
    title : {
        type: String,
        unique: true,
        required: true,
        default: "Project name"
    },
    description : {
        type: String,
        required: true,
        default: "Project description"
    },
    user : {
        type: String,
        required: true,
        default: "admin"
    },
    link : {
        type: String,
        unique: true,
        required: false, 
        default: "localhost:3000"
    },
    type : {
        type: String,
        unique: false,
        required: true, 
        default: "Application"
    },
    date : {
        type: Date,
        default: new Date()
    },
    buff: Buffer
});
 
module.exports = mongoose.model('project', ProjectSchema);