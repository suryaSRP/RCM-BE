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
        let commonDb = connectDb("commonDb")
        commonDb.models = {}
        let commonFldsDb = commonDb.model("commonFlds", Schema({}, {
            collection: "commonFlds"
        }));
        commonFldsDb.find(queryProjection.query, queryProjection.project ? queryProjection.project : {}).sort({ seq: 1 }).exec(callback)
    },

    getFldsData: (req, callback) => {
        console.log(req.headers['clientsid'], "req.headers['clientsid']_getFldsData", req.params.fetchID, req.params.page)
        let commonDb = connectDb(req.headers['clientsid'].split(";")[0])
        commonDb.models = {}
        let flagDb = commonDb.model("companyInfos", Schema({}, {
            collection: "companyInfos"
        }));
        console.log("dbbbbbbbbbbbbbbbb")
        flagDb.find({"cmpny_id":JSON.parse(req.params.fetchID)}).exec(callback)


    }
}