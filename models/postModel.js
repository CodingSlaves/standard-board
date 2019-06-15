const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    contents:{
        type:String
    }
});

const postSchema = new mongoose.Schema({
    author:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    contents:{
        type:String
    },
    title:{
        type:String
    },
    comment:[commentSchema],
    Date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Post',postSchema);
