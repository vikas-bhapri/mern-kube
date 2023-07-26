const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://sampledb:vikas98455@sampledb.0sjnmp6.mongodb.net/';

const connectToMongo = async () => {
    mongoose.connect(mongoURI, () => {
        console.log("connected to mongo")
    })
}

module.exports = connectToMongo;