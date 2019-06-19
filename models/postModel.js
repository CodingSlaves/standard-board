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

mongoose.connection.on('connected',()=>{
    autoInc.initialize(mongoose.connection);
    autoInc.plugin(postSchema, {
        model: 'Post',
        field: 'num'
    });
});

module.exports = mongoose.model('Post', postSchema);
