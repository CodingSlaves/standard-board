const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    ID:{
        type:String,
        required:true,
        unique:true
    },
    PW:{
        type:String,
        required:true,
        validate : [
        function(password) {
            return password.length >= 8;
        },
        'Password should be longer'
        ]
    },
    myPost:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Post'
    }]
});

module.exports = mongoose.model('User',userSchema);