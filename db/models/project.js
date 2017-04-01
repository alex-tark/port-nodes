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
        default: admin
    },
    link : {
        type: String,
        unique: true,
        required: false, 
        default: "localhost:3000"
    },
    date : {
        type: Date
    },
    buff: Buffer
});
 
var ItemModel = mongoose.model('project', ItemSchema);
 
module.exports = ItemModel