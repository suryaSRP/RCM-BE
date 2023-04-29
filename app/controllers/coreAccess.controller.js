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

    getAllEmployee: (req, res, callback) => {
        console.log(req.headers['clientsid'].split(";")[0], "req.headers['clientsid']__getPageFlds")
        let clientId = req.headers['clientsid'].split(";")[0]
        let db = connectDb(clientId)
        db.models = {}
        let personInfos = db.model("personInfos", Schema({}, {
            collection: "personInfos"
        }));
        let positionMaster = db.model("positionMaster", Schema({}, {
            collection: "positionMaster"
        }));
        personInfos.find({}).exec((err, emp) => {
            emp = JSON.parse(JSON.stringify(emp))
            emp.forEach((data, id, arr) => {
                field.options.push({ "id": data.ee_id, "name": data.sort_frmt_nm })
                if (id === arr.length - 1) {
                    res.send(emp)
                }
            })
        })
    },
    getVacantPositionList: (req, callback) => {
        let clientId = req.headers['clientsid'].split(";")[0]
        let db = connectDb(clientId)
        db.models = {}
        let positionMaster = db.model("positionMaster", Schema({}, {
            collection: "positionMaster"
        }));
        positionMaster.find({ "isVacant": true, "data_stat_cd": "A", }).exec((err, pstn) => {
            pstn = JSON.parse(JSON.stringify(pstn))
            console.log(pstn.length, "pstn_length")
            pstn.forEach((data, ide, arry) => {
                PstnData.push({ "id": data.pstn_id, "name": data.pstn_titl_tx })
                if (ide === arry.length - 1) {
                    res.send(PstnData)
                }
            })
        })
    },
    getDetailsModule: (req, res, callback) => {
        let actionCollection = req.params.fetchFldsForPage
        let requestedBody = req.body
        let requestedHeader = req.headers['clientsid'].split(";")
        let commonData = {
            "clnt_intn_id": requestedHeader[0],
            "data_owner": requestedHeader[1] ? requestedHeader[1] : "",
            "role": requestedHeader[2] ? requestedHeader[2] : 0,
            "efcv_bgdt": new Date(),
            "efcv_endt": new Date("2999-12-31"),
            "data_stat_cd": "A",
            "row_ts": new Date()
        }
        let createModeDB = connectDb(req.headers['clientsid'].split(";")[0])
        createModeDB.models = {}
        console.log(`../models/${actionCollection}.js`, "actionCollectionURL")
        let getDB = createModeDB.model(actionCollection, new Schema(require(`../models/${actionCollection}.js`), {
            collection: actionCollection
        }));
        requestedBody = { ...requestedBody, ...commonData }
        let query = { "data_stat_cd": "A", }
        if (actionCollection == "positionMaster") {
            query = { "isVacant": true, "data_stat_cd": "A" }
        }
        let finalData = []
        console.log(requestedBody, "requestedBody_requestedBody_requestedBody_requestedBody")
        // const newCreateAction = new createDB(requestedBody)
        // console.log(newCreateAction, "create_new_action_DB")
        getDB.find(query).exec((err, resp) => {
            if (err) {
                console.log(err, "err_on_createMode")
                return callback({ "message": `get ${actionCollection}'s record failed`, status: "failed", data: err })
            } else {
                resp.forEach((data, ide, arry) => {
                    if (actionCollection == "positionMaster") {
                        finalData.push({ "id": data.pstn_id, "name": data.pstn_titl_tx })
                    }
                    if (ide === arry.length - 1) {
                        return callback({ "message": `get ${actionCollection}'s record sucessfully`, status: "success", data: finalData })
                    }
                })
            }
        })
    },
    getDetailsWithIdModule: (req, res, callback) => {
        let actionCollection = req.params.fetchFldsForPage
        let requestedBody = req.body
        let requestedHeader = req.headers['clientsid'].split(";")
        let commonData = {
            "clnt_intn_id": requestedHeader[0],
            "data_owner": requestedHeader[1] ? requestedHeader[1] : "",
            "role": requestedHeader[2] ? requestedHeader[2] : 0,
            "efcv_bgdt": new Date(),
            "efcv_endt": new Date("2999-12-31"),
            "data_stat_cd": "A",
            // "row_ts": new Date()
        }
        let createModeDB = connectDb(req.headers['clientsid'].split(";")[0])
        createModeDB.models = {}
        console.log(`../models/${actionCollection}.js`, "actionCollectionURL")
        let getDB = createModeDB.model(actionCollection, new Schema(require(`../models/${actionCollection}.js`), {
            collection: actionCollection
        }));
        requestedBody = { ...requestedBody, ...commonData }
        let query = { "data_stat_cd": "A", }
        if (actionCollection == "positionMaster") {
            query = { "isVacant": true, "data_stat_cd": "A" }
            if (req.params.id || "") {
                query = {...query,...{"pstn_id":req.params.id}}
            }
        }
        let finalData = []
        getDB.find(query).exec((err, resp) => {
            if (err) {
                console.log(err, "err_on_createMode")
                return callback({ "message": `get ${actionCollection}'s record failed`, status: "failed", data: err })
            } else {
                resp.forEach((data, ide, arry) => {
                    if (actionCollection == "positionMaster") {
                        finalData.push(data)
                    }
                    if (ide === arry.length - 1) {
                        return callback({ "message": `get ${actionCollection}'s record sucessfully`, status: "success", data: finalData })
                    }
                })
            }
        })
    },
}