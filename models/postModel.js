const mongoose = require('mongoose');
const autoInc = require('mongoose-auto-increment');

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
    num:{
        type:Number,
        unique:true,
        index:true
    },
    comment:[commentSchema],
    Date:{
        type:Date,
        default:Date.now
    }
});

postSchema.plugin(autoInc.plugin,{
    model:'Post',
    field:'num',
    startAt:0,
    incrementBy:1
});

module.exports = mongoose.model('Post',postSchema);
