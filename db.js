const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
module.exports = () => {
    function connect() {
        mongoose.connect('mongodb://localhost:27017/standard-board', {
                useNewUrlParser: true
            })
            .then(() => {
                console.log('mongodb connected');
            })
            .catch(err => {
                console.error(err);
            });
    }
    connect();
    mongoose.connection.on('disconnected', connect);
};