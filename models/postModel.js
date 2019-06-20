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
    comment:[commentSchema],
    Date:{
        type:Date,
        default:Date.now
    },
    id:{
        type:Number
    }
});

module.exports = mongoose.model('Post', postSchema);
autoInc.initialize(mongoose.connection);
// postSchema.plugin(autoInc.plugin,'Post');