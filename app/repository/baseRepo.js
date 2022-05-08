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
        let companiesdb = db.model("companies", Schema({}, {
            collection: "companies"
        }));
        companiesdb.find(queryProjection.query, queryProjection.project).exec(callback)
    },
    companyWithOrgInfo: (req, queryProjection, callback) => {
        console.log("company repo hitted")
                let db = connectDb(req.headers['clientsid'].split(";")[0])
                db.models = {}
                let companiesdb = db.model("companies", Schema({}, {
                    collection: "companies"
                }));
                companiesdb.aggregate([{
                    $lookup: {
                           from: "organisationInfo",
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
        let companiesdb = db.model("organisationInfo", Schema({}, {
            collection: "organisationInfo"
        }));
        companiesdb.find(queryProjection.query, queryProjection.project).exec(callback)
    },
    orgRepositoryNew: (req, queryProjection) => {
        return new Promise((resolve, reject) => {
        let db = connectDb(req.headers['clientsid'].split(";")[0])
        db.models = {}
        let companiesdb = db.model("organisationInfo", Schema({}, {
            collection: "organisationInfo"
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
        let companiesdb = db.model("personMaster", Schema({}, {
            collection: "personMaster"
        }));
        companiesdb.find(queryProjection.query, queryProjection.project).exec(callback)
    }
}