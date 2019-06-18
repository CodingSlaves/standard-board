const mongoose = require('mongoose');
const autoInc = require('mongoose-auto-increment');
mongoose.Promise = global.Promise;
module.exports = () => {
    function connect() {
        const connection = mongoose.connect('mongodb://localhost:27017/standard-board', {
                useNewUrlParser: true
            })
            .then(() => {
                console.log('mongodb connected');
            })
            .catch(err => {
                console.error(err);
            });
        autoInc.initialize(connection);
    }
    connect();

    mongoose.connection.on('disconnected', connect);
};