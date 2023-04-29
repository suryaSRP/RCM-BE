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
    companyRepository: (req, queryProjection, callback) => {
console.log("company repo hitted")
        let db = connectDb(req.headers['clientsid'].split(";")[0])
        db.models = {}
        let companiesdb = db.model("companyInfos", Schema({}, {
            collection: "companyInfos"
        }));
        companiesdb.find(queryProjection.query, queryProjection.project).exec(callback)
    },
    companyWithOrgInfo: (req, queryProjection, callback) => {
        console.log("company repo hitted")
                let db = connectDb(req.headers['clientsid'].split(";")[0])
                db.models = {}
                let companiesdb = db.model("companyInfos", Schema({}, {
                    collection: "companyInfos"
                }));
                companiesdb.aggregate([{
                    $lookup: {
                           from: "orgInfo",
                           localField: "cmpny_id",
                           foreignField: "cmpny_id",
                           as: "orgInfo"
                         }
                },
                
                ]).exec(callback)
            },

    orgRepository: (req, queryProjection, callback) => {

        let db = connectDb(req.headers['clientsid'].split(";")[0])
        db.models = {}
        let companiesdb = db.model("orgInfo", Schema({}, {
            collection: "orgInfo"
        }));
        companiesdb.find(queryProjection.query, queryProjection.project).exec(callback)
    },
    orgRepositoryNew: (req, queryProjection) => {
        return new Promise((resolve, reject) => {
        let db = connectDb(req.headers['clientsid'].split(";")[0])
        db.models = {}
        let companiesdb = db.model("orgInfo", Schema({}, {
            collection: "orgInfo"
        }));
        companiesdb.find(queryProjection.query, queryProjection.project).exec((err,resp)=>{
            if(err){
                return err
            }else{
                return resolve(resp)
            }
        })
    })
    },

    PstnRepository: (req, queryProjection, callback) => {

        let db = connectDb(req.headers['clientsid'].split(";")[0])
        db.models = {}
        let companiesdb = db.model("positionMaster", Schema({}, {
            collection: "positionMaster"
        }));
        companiesdb.find(queryProjection.query, queryProjection.project).exec(callback)
    },
    
    personRepository: (req, queryProjection, callback) => {

        let db = connectDb(req.headers['clientsid'].split(";")[0])
        db.models = {}
        let personInfosdb = db.model("personInfos", Schema({}, {
            collection: "personInfos"
        }));
        console.log(queryProjection.query,"queryProjection.queryqueryProjection.queryqueryProjection.query")
        personInfosdb.find(queryProjection.query, queryProjection.project).exec(callback)
    }
}