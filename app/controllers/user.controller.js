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
// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "AC4b932684c8d0b6d961960d8e22b7d8db";
const authToken = "fb6eb9ad274177cd099a9aff37631aba";
const verifySid = "VA2fac02b4765c402fa1cbcf058bf8bc01";
const client = require("twilio")(accountSid, authToken);

// client.verify.v2
//   .then(() => {
//     const readline = require("readline").createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     readline.question("Please enter the OTP:", (otpCode) => {
//       client.verify.v2
//         .services(verifySid)
//         .verificationChecks.create({ to: "+917299901074", code: otpCode })
//         .then((verification_check) => console.log(verification_check.status))
//         .then(() => readline.close());
//     });
//   });
module.exports = {
  createUserController: (req, res, callback) => {
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
        body: `Hi ${userData.frst_nm},${userData.last_nm},Welcome to Winzone cloud kindly enter this OTP to activate Your account - ${generatedOTP}`,
        from: '+16206589312',
        to: `+91${userData.mobile_no}`
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
              "role": requestedHeader[2] ? requestedHeader[2] : 0,
              "efcv_bgdt": new Date(),
              "efcv_endt": new Date("2999-12-31"),
              "data_stat_cd": "A",
              "row_ts": new Date(),
              "emp_status": "Initated"
            }
            console.log(`../models/personInfos.js`, "actionCollectionURL")
            let createDB = createModeDB.model("personInfos", new Schema(require(`../models/personInfos.js`), {
              collection: 'personInfos'
            }));
            requestedBody = { ...requestedBody, ...commonData }
            const newCreateAction = new createDB(requestedBody)
            console.log(requestedBody, "requestedBodyrequestedBodyrequestedBodyrequestedBody")
            console.log(newCreateAction, "user_creationstep")
            newCreateAction.save((err, resp) => {
              if (err) {
                console.log(err, "err_on_createMode")
                return callback({ "message": `create PersonInfos's record failed`, status: "failed", data: 'err' })
              } else {
                let positionMaster = createModeDB.model("positionMaster", new Schema(require(`../models/positionMaster.js`), {
                  collection: 'positionMaster'
                }));
                let pstnFilter = { "pstn_id": userData.pstn_id }
                let pstnUpdate = { 'isVacant': false }
                console.log(pstnUpdate, "pstnUpdatepstnUpdatepstnUpdatepstnUpdate", pstnFilter)
                positionMaster.findOneAndUpdate({ "pstn_id": userData.pstn_id }, { $set: { 'isVacant': false, row_ts: new Date() } }, { "multi": true }).exec((err, resp) => {
                  console.log(resp, "respresprespresprespresp_positionmaster")
                  console.log(err, "errerrerrerrerr")
                  if (err) {
                    console.log(err, "err_on_createMode")
                    return callback({ "message": `create PersonInfos's record failed`, status: "failed", data: 'err' })
                  } else {
                    return callback({ "message": `create PersonInfos's record sucessfully`, status: "success", data: resp })
                  }
                })
              }
            })
          }
        })
      })
  },
  getUserList: (req, res, callback) => {

    let empDB = connectDb(req.headers['clientsid'].split(";")[0])
    empDB.models = {}
    let personInfos = empDB.model("personInfos", new Schema(require(`../models/personInfos.js`), {
      collection: 'personInfos'
    }));
    personInfos.aggregate([{
      $lookup: {
        from: "personInfos",
        localField: "manager_id",
        foreignField: "ee_id",
        as: "manager"
      }
    }, { $unwind: "$manager" },
    {
      $project: {
        _id: 0,
        ee_id: 1,
        frst_nm: 1,
        last_nm: 1,
        "emp_status": 1,
        "manager_nm": {
          $ifNull: ["$manager.frst_nm", ""]
        }
      }
    }]).exec((err, userData) => {
      if (err) {
        console.log(err, "err_on_createMode")
        return callback({ "message": `fetch PersonInfos's record failed`, status: "failed", data: 'err' })
      } else if (userData.length) {
        let userList = JSON.parse(JSON.stringify(userData))
        return callback({ "message": `Fetch PersonInfos's record sucessfully`, status: "success", data: userList })
      } else {
        return callback({ "message": `Fetch PersonInfos's record sucessfully`, status: "success", data: [] })

      }
    })
  },

  getEmpIDFromManager: (req, res) => {
    return new Promise(function(resolve, reject) {
console.log("getEmpIDFromManager_triggers")
    let empDB = connectDb(req.headers['clientsid'].split(";")[0])
    empDB.models = {}
    let userDB = empDB.model("personInfos", new Schema(require(`../models/personInfos.js`), {
      collection: 'personInfos'
    }));
    let assigneArray = []
    userDB.find({ 'manager_id': req.params.userId }, { ee_id: 1, _id: 0 }).exec((err, empData) => {
      if (err) {

      } else if (empData.length > 0) {
        console.log("empData_list_found",empData)
        let empID = JSON.parse(JSON.stringify(empData))
        empID.forEach((element, ind, array) => {
          assigneArray.push(element.ee_id)
          if ((array.length) && (ind === array.length - 1)) {
            assigneArray.push(req.params.userId)
            req.assigneArray = assigneArray
            resolve(req.assigneArray)
          }
        });
      } else {
        console.log("no_manage_found",empData)
        req.assigneArray = [req.params.userId]
        resolve(req.assigneArray)
      }
    })
  })
  }
}