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
const fldsRepo = require("../repository/fldsFetchRepo")
const { callbackify } = require("util");
module.exports = {
    getPageFlds: (req, res, callback) => {
        console.log(req.headers['clientsid'].split(";")[0], "req.headers['clientsid']__getPageFlds")
        let clientId = req.headers['clientsid'].split(";")[0]
        
        let query = {
            "data_stat_cd": "A",
            role_to_edit: req.headers['clientsid'].split(";")[2] ? parseInt(req.headers['clientsid'].split(";")[2]) : 0,
            clnt_intn_id: {
                $in: ["common", clientId]
            },
            page: req.params.fetchFldsForPage
        }
        let pageQuery = {}
        if (req.params.getQuery === 'delete') {
            pageQuery = { "fld_nm": "rsn_to_delete", }
        }
        let getQuery = { ...query, ...pageQuery }
        let queryProjection = {
            getQuery,
            project: {}
        }
        fldsRepo.pageActionFlds(req, queryProjection, ((err, fldsResp) => {
            if (err) {
                console.log("Error", "fldsMiddleware", "getOrgInfoFlds", err)
                return callback(err)
            } else if (fldsResp.length > 0) {
                fldsResp = JSON.parse(JSON.stringify(fldsResp))
                return callback(fldsResp)

            } else {
                return callback(fldsResp)
            }
        }))
    },
}