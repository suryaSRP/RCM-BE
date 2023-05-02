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

//Twilio Access
const accountSid = "AC4b932684c8d0b6d961960d8e22b7d8db";
const authToken = "3e1ee2f0a4830d023ceb22e5b8d0ff80";
const verifySid = "VA2fac02b4765c402fa1cbcf058bf8bc01";
const client = require("twilio")(accountSid, authToken);

module.exports = {
    getEventList: (req, res, callback) => {
        return new Promise(function (resolve, reject) {
            let DB = connectDb(req.headers['clientsid'].split(";")[0])
            DB.models = {}            
            let eventDB = DB.model("event_scheduler", new Schema({}, {
                collection: 'event_scheduler'
            }));
            console.log(req.assigneArray,"req.assigneArray___getEventList")
            let assigneArray = (req.assigneArray.length) ? req.assigneArray : []
            eventDB.find({
                'assignTo': {
                    $in: assigneArray
                }
            }).exec((err, eventData) => {
                if (err) {

                } else {
                    let eventProgressData = JSON.parse(JSON.stringify(eventData))
                    console.log(eventProgressData, "getEventListgetEventListgetEventList")
                    resolve(eventProgressData)
                }
            })
        })
    },
    createEventController: (req, res, callback) => {
        let createModeDB = connectDb(req.headers['clientsid'].split(";")[0])
        createModeDB.models = {}
        let otpVerifyDB = createModeDB.model('userVerification', new Schema(require(`../models/userVerification.js`), {
          collection: 'userVerification'
        }));
        var generatedOTP = Math.floor(1000 + Math.random() * 9000);
        var userData = req.body
        console.log(userData, "user_Data_details", generatedOTP)
        client.messages
          .create({
            body: `Hi ${userData.clientName},Welcome to Winzone cloud kindly Share this OTP on Our Executive Visit - ${generatedOTP}`,
            from: '+16206589312',
            to: `+91${userData.clientMobileNo}`
          }).then(message => {
    
            // console.log(message, "messsssssssssssssssssss")
            let otpData = { ...message, ...{ 'ee_id': userData.ee_id, 'OTP': generatedOTP } }
            // console.log(otpData, "otpDataotpDataotpDataotpData")
            const otpDB = new otpVerifyDB(otpData)
            otpDB.save((err, resp) => {
              if (err) {
                console.log(err, "err_on_createMode")
                return callback({ "message": `create userVerification's record failed`, status: "failed", data: 'err' })
              } else if (resp) {
                let requestedBody = req.body
                let requestedHeader = req.headers['clientsid'].split(";")
                let commonData = {
                  "clnt_intn_id": requestedHeader[0],
                  "data_owner": requestedHeader[1] ? requestedHeader[1] : "",
                  "efcv_bgdt": new Date(),
                  "efcv_endt": new Date("2999-12-31"),
                  "data_stat_cd": "A",
                  "row_ts": new Date(),
                }
                let createDB = createModeDB.model("event_scheduler", new Schema(require(`../models/event_scheduler.js`), {
                    collection: 'event_scheduler'
                }));
                requestedBody = { ...requestedBody, ...commonData }
                console.log(requestedBody,"requestedBodyrequestedBodyrequestedBody")
                const newCreateAction = new createDB(requestedBody)
                newCreateAction.save((err, resp) => {
                  if (err) {
                    console.log(err, "err_on_createMode")
                    return callback({ "message": `create PersonInfos's record failed`, status: "failed", data: 'err' })
                  } else {                    
                    return callback({ "message": `create PersonInfos's record sucessfully`, status: "success", data: resp })
                  }
                })
              }
            })
          })
      },
}