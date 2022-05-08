const express = require("express");
const cors = require("cors");
var http = require('http');
var libs = require("../../app/common/libs");
var mongoose = require("mongoose");
global.response = require('response');
var app = libs.express();
var connectDb = require("../../clientsdb");
var Schema = mongoose.Schema;
var generic = new Schema({});
module.exports = {    
    pageActionFlds: (req, queryProjection, callback) => {
        console.log("commonDb repo hitted",queryProjection)
                let commonDb = connectDb("commonDb")
                commonDb.models = {}
                let commonFldsDb = commonDb.model("commonFlds", Schema({}, {
                    collection: "commonFlds"
                }));
                commonFldsDb.find(queryProjection.query, queryProjection.project?queryProjection.project:{}).exec(callback)
            },
}