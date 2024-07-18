const mongoose = require('mongoose');

const PostSchma = new mongoose.Schema({
    title : {
        type : String,
        require : true,
    },
    content : {
        type : String,
        require : true,
    },

},{timestamps:true});

module.exports = mongoose.model('Post',PostSchma);