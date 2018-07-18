var mongoose = require('mongoose');
//Set up default mongoose connection

var mongoDB ="mongodb://bharaththatikonda:admin123@ds239931.mlab.com:39931/studentprofile"
//var mongoDB = 'mongodb://127.0.0.1:27017/Task';
mongoose.connect(mongoDB,{ useNewUrlParser: true });
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// var MongoClient = require('mongodb').MongoClient
//     , format = require('util').format;
// MongoClient.connect('mongodb://127.0.0.1:27017/task', function (err, db) {
//     if (err) {
//         throw err;
//     } else {
//         console.log("successfully connected to the database");
//     }
//     db.close();
// });
module.exports = mongoose;

