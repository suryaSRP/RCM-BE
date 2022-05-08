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

        // if (res.role !== 1 && res.role !== 2) {

        // }
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
                    baseRepo.orgRepositoryNew(req,orgQuery).then((resp)=>{
                        console.log(resp,"orginfo details received")
                        let orgInfosData = JSON.parse(JSON.stringify(data))
                                orgInfosData.forEach((orgData, orgInd) => {
                                    if (orgData.cmpny_id == cmpdata.cmpny_id) {
                                        cmpdata["orgInfo"].push(orgData)
                                    }
                                    console.log(companyData.length == ind, "123companyData.length == ind_companyData.length == ind", companyData.length, ind)
                                    console.log(orgInfosData.length-1 == orgInd, "123companyData.length == ind_companyData.length == ind", orgInfosData.length, orgInd)
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
    }
}