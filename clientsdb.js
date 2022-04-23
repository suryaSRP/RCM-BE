var config = require('./config/config');
var mongoose = require('mongoose');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
//Object holding all your connection strings
var newConnect = {};
var getDatabaseConnection = function (dbName) {
    if (newConnect[dbName]) {
        //database connection already exist. Return connection object   
        return newConnect[dbName];
    } else {
        let options = {
            server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
            replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
        };
        newConnect[dbName] = mongoose.createConnection(config.getQualifiedDBUrl(dbName));
        console.log(config.getQualifiedDBUrl(dbName),"config.getQualifiedDBUrl(dbName)")
        return newConnect[dbName];
    }
}

module.exports = getDatabaseConnection;
