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
const baseRepo = require("../repository/baseRepo");
const { callbackify } = require("util");
module.exports = {
    companyDetails: (req, res, callback) => {
        let queryProjection = res.companyQuery ? res.companyQuery : { query: { "data_stat_cd": "A" }, project: {} }
        baseRepo.companyRepository(req, queryProjection, function (err, data) {
            if (err) {
                return callback(err, null)
            } else if (data.length > 0) {
                let companyData = JSON.parse(JSON.stringify(data))
                let result = { data: companyData, message: "Compnay Details Received" }
                return callback(result)
            } else {
                let result = { data: [], msg: "No Company Details found" }
                return callback(result)
            }
        })

    },
    companyWithOrgDetails: (req, res, callback) => {
        let queryProjection = req.companyQuery ? req.companyQuery : { query: { "data_stat_cd": "A" }, project: {} }
        baseRepo.companyWithOrgInfo(req, queryProjection, function (err, data) {
            if (err) {
                return callback(err, null)
            } else if (data.length > 0) {
                let companyData = JSON.parse(JSON.stringify(data))
                let result = { data: companyData, message: "Compnay Details Received" }
                return callback(result)
            } else {
                let result = { data: [], msg: "No Company Details found" }
                return callback(result)
            }
        })

    },

    orgInfosDetails: (req, res, callback) => {
        let queryProjection = res.orgInfoQuery ? res.orgInfoQuery : { query: { "data_stat_cd": "A" }, project: {} }
        baseRepo.orgRepository(req, queryProjection, function (err, data) {
            if (err) {
                return callback(err, null)
            } else if (data.length > 0) {
                let orgInfosData = JSON.parse(JSON.stringify(data))
                return callback({ data: orgInfosData, message: "Organasation Details Received" })
            } else {
                return callback({ data: [], msg: "No Organasation Details found" })
            }
        })

    },
    pstnMasterDetails: (req, res, callback) => {
        let queryProjection = res.pstnMasterQuery ? res.pstnMasterQuery : { query: { "data_stat_cd": "A" }, project: {} }
        baseRepo.PstnRepository(req, queryProjection, function (err, data) {
            if (err) {
                return callback(err, null)
            } else if (data.length > 0) {
                let pstnMasterData = JSON.parse(JSON.stringify(data))
                return callback({ data: pstnMasterData, message: "Positions Details Received" })
            } else {
                return callback({ data: [], msg: "No Positions Details found" })
            }
        })

    },

    personMasterDetails: (req, res, callback) => {
        let queryProjection = res.personMasterQuery ? res.personMasterQuery : { query: { "data_stat_cd": "A" }, project: {} }
        baseRepo.personRepository(req, queryProjection, function (err, data) {
            if (err) {
                return callback(err, null)
            } else if (data.length > 0) {
                let personMasterData = JSON.parse(JSON.stringify(data))
                return callback({ data: personMasterData, message: "Employees Details Received" })
            } else {
                return callback({ data: [], msg: "No Employees Details found" })
            }
        })

    },
    getBaseDetails: (req, res, callback) => {
        let query = { query: { "data_stat_cd": "A" }, project: { "cmpny_id": 1, } }
        baseRepo.companyRepository(req, query, function (err, data) {
            if (err) {
                console.log("Error", "baseFileController", "getBaseDetails", "company Repo response", err)
                return callback(err, null)
            } else if (data.length > 0) {
                let companyData = JSON.parse(JSON.stringify(data))
                companyData.forEach((cmpdata, ind) => {
                    let orgQuery = { query: { "cmpny_id": cmpdata.cmpny_id, "data_stat_cd": "A" }, project: {} }
                    cmpdata["orgInfo"] = []
                    var orgLastElem = false
                    console.log(cmpdata, "company dataaa")
                    // baseRepo.orgRepository(req, orgQuery, function (err, data) {
                    //     if (err) {
                    //         console.log("Error", "baseFileController", "getBaseDetails", "Organisation Repo response", err)
                    //         return callback(err, null)
                    //     } else if (data) {
                    //         let orgInfosData = JSON.parse(JSON.stringify(data))
                    //         orgInfosData.forEach((orgData, orgInd) => {
                    //             if (orgData.cmpny_id == cmpdata.cmpny_id) {
                    //                 cmpdata["orgInfo"].push(orgData)
                    //             }
                    //             console.log(companyData.length == ind, "123companyData.length == ind_companyData.length == ind", companyData.length, ind)
                    //             console.log(orgInfosData.length-1 == orgInd, "123companyData.length == ind_companyData.length == ind", orgInfosData.length, orgInd)
                    //             if (orgInfosData.length - 1 == orgInd) {
                    //                 orgLastElem = true
                    //             }

                    // if ((companyData.length - 1 == ind) && (orgLastElem == true)) {
                    //     return callback({ data: companyData, message: "base Details received" })
                    // }
                    //         })
                    //     }
                    // })
                    baseRepo.orgRepositoryNew(req, orgQuery).then((resp) => {
                        console.log(resp, "orginfo details received")
                        let orgInfosData = JSON.parse(JSON.stringify(data))
                        orgInfosData.forEach((orgData, orgInd) => {
                            if (orgData.cmpny_id == cmpdata.cmpny_id) {
                                cmpdata["orgInfo"].push(orgData)
                            }
                            console.log(companyData.length == ind, "123companyData.length == ind_companyData.length == ind", companyData.length, ind)
                            console.log(orgInfosData.length - 1 == orgInd, "123companyData.length == ind_companyData.length == ind", orgInfosData.length, orgInd)
                            if (orgInfosData.length - 1 == orgInd) {
                                orgLastElem = true
                            }

                        })
                    })
                    console.log(companyData.length - 1 == ind, "companyData.length == ind_companyData.length == ind", companyData.length, ind)

                    if ((companyData.length - 1 == ind) && (orgLastElem == true)) {
                        return callback({ data: companyData, message: "base Details received" })
                    }
                })

            } else {
                let result = { data: [], msg: "No Company Details found" }
                return callback(result)
            }
        })
    },

    createActionModule: (req, res, callback) => {
        let actionCollection = req.params.pageToCreate
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
        let createDB = createModeDB.model(actionCollection, new Schema(require(`../models/${actionCollection}.js`), {
            collection: actionCollection
        }));
        requestedBody = { ...requestedBody, ...commonData }
        console.log(requestedBody, "requestedBody_requestedBody_requestedBody_requestedBody")
        const newCreateAction = new createDB(requestedBody)
        console.log(newCreateAction, "create_new_action_DB")
        newCreateAction.save((err, resp) => {
            if (err) {
                console.log(err, "err_on_createMode")
                return callback({ "message": `create ${actionCollection}'s record failed`, status: "failed", data: err })
            } else {
                return callback({ "message": `create ${actionCollection}'s record sucessfully`, status: "success", data: resp })
            }
        })
    },
    deleteActionModule: (req, res, callback) => {
        let actionCollection = req.params.collectionName
        let requestedHeader = req.headers['clientsid'].split(";")
        let createModeDB = connectDb(req.headers['clientsid'].split(";")[0])
        createModeDB.models = {}
        console.log(`../models/${actionCollection}.js`, "actionCollectionURL")
        let deleteDB = createModeDB.model(actionCollection, new Schema(require(`../models/${actionCollection}.js`), {
            collection: actionCollection
        }));
        const ObjectID = require('mongodb').ObjectId;
        deleteDB.update({ _id: new ObjectID(req.params.dataId) }, {
            $set: {
                "data_stat_cd": "I",
                "row_ts": new Date(),
                "efcv_endt": new Date(),
                "data_owner": requestedHeader[1] ? requestedHeader[1] : "",
            }
        }).exec((err, resp) => {
            if (err) {
                return callback({ "message": `Delete ${actionCollection}'s record sucessfully`, status: "failed", data: resp, actionPage: actionCollection })
            } else {
                return callback({ "message": `Delete ${actionCollection}'s record sucessfully`, status: "success", data: resp, actionPage: actionCollection })
            }
        })
    },
    editActionModule: (req, res, callback) => {
        let actionCollection = req.params.collectionName
        let requestedHeader = req.headers['clientsid'].split(";")
        let createModeDB = connectDb(req.headers['clientsid'].split(";")[0])
        createModeDB.models = {}
        console.log(`../models/${actionCollection}.js`, "actionCollectionURL")
        let editDB = createModeDB.model(actionCollection, new Schema(require(`../models/${actionCollection}.js`), {
            collection: actionCollection
        }));
        const ObjectID = require('mongodb').ObjectId;
        // deleteDB.update({ _id: new ObjectID(req.params.dataId) }, {
        //     $set: {
        //         "data_stat_cd": "I",
        //         "row_ts": new Date(),
        //         "efcv_endt": new Date(),
        //         "data_owner": requestedHeader[1] ? requestedHeader[1] : "",
        //     }
        // }).exec((err, resp) => {
        //     if (err) {
        //         return callback({ "message": `Delete ${actionCollection}'s record sucessfully`, status: "failed", data: resp, actionPage: actionCollection })
        //     } else {
        //         return callback({ "message": `Delete ${actionCollection}'s record sucessfully`, status: "success", data: resp, actionPage: actionCollection })
        //     }
        // })
    },
    infoActionModule: (req, res, callback) => {
        let actionCollection = (req.params.collectionName == 'employeeMaster') ? 'personInfos' : req.params.collectionName
        let requestedHeader = req.headers['clientsid'].split(";")
        let createModeDB = connectDb(req.headers['clientsid'].split(";")[0])
        createModeDB.models = {}
        console.log(`../models/${actionCollection}.js`, "actionCollectionURL")
        let infoDB = createModeDB.model(actionCollection, new Schema(require(`../models/${actionCollection}.js`), {
            collection: actionCollection
        }));
        let query = {}
        if (actionCollection == 'personInfos') {
            query = { pstn_id: req.params.dataId }
        } else {
            query = { _id: new ObjectID(req.params.dataId) }
        }
        console.log(query, "queryqueryqueryquery")
        const ObjectID = require('mongodb').ObjectId;
        infoDB.find(query).exec((err, resp) => {
            if (err) {
                return callback({ "message": `Delete ${actionCollection}'s record sucessfully`, status: "failed", data: resp, actionPage: actionCollection })
            } else {
                return callback({ "message": `Delete ${actionCollection}'s record sucessfully`, status: "success", data: resp, actionPage: actionCollection })
            }
        })
        // deleteDB.update({ _id: new ObjectID(req.params.dataId) }, {
        //     $set: {
        //         "data_stat_cd": "I",
        //         "row_ts": new Date(),
        //         "efcv_endt": new Date(),
        //         "data_owner": requestedHeader[1] ? requestedHeader[1] : "",
        //     }
        // }).exec((err, resp) => {
        //     if (err) {
        //         return callback({ "message": `Delete ${actionCollection}'s record sucessfully`, status: "failed", data: resp, actionPage: actionCollection })
        //     } else {
        //         return callback({ "message": `Delete ${actionCollection}'s record sucessfully`, status: "success", data: resp, actionPage: actionCollection })
        //     }
        // })
    },

    updateActionModule: (req, res, callback) => {
        let actionCollection = req.params.pageToCreate
        let createModeDB = connectDb(req.headers['clientsid'].split(";")[0])
        createModeDB.models = {}
        console.log(`../models/${actionCollection}.js`, "actionCollectionURL")
        let updateDB = createModeDB.model(actionCollection, new Schema(require(`../models/${actionCollection}.js`), {
            collection: actionCollection
        }));
        let updatedData = req.body ? { ...JSON.parse(JSON.stringify(req.body)), ...{ "row_ts": new Date() } } : ""
        console.log(updatedData, "updatedData._id")
        console.log(req.params.dataId, "updatedData._idupdatedData._idupdatedData._id")
        const ObjectID = require('mongodb').ObjectId;
        updateDB.updateOne({ _id: ObjectID(req.params.dataId) }, {
            $set: updatedData

        }).exec((err, resp) => {
            console.log("resprespresprespresp_updateActionModule", resp)
            console.log("errerrerrerrerrerrerr_updateActionModule", err)
            if (err) {
                return callback({ "message": `updated ${actionCollection}'s record sucessfully`, status: "failed", data: resp, actionPage: actionCollection })
            } else {
                return callback({ "message": `updated ${actionCollection}'s record sucessfully`, status: "success", data: resp, actionPage: actionCollection })
            }
        })
    },
}