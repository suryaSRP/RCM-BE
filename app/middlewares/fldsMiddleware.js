const fldsFetchController = require("../controllers/fldsFetchController")
const fldsRepo = require("../repository/fldsFetchRepo")
var connectDb = require("../../clientsdb");
var http = require('http');
var libs = require("../../app/common/libs");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var generic = new Schema({});

module.exports = {

    fetchFldsForPage: (req, res, next) => {
        let fieldRespArray=[]
        let clientId = req.headers['clientsid'].split(";")[0]
        let db = connectDb(clientId)
        db.models = {}
        let query = { ...req.params.getQuery, ...{ "data_stat_cd": "A" } }
        res["companyQuery"] = { query, project: {} }
        fldsFetchController.getPageFlds(req, res, ((resp) => {
            if (resp.length > 0) {
                resp.forEach((field, idx, array) => {
                    fieldRespArray.push(field)
                    // console.log(fieldRespArray,"field_fdfdfdf")
                    if(idx == array.length -1){
                        // console.log(fieldRespArray,"resprespresprespresprespresp")
                        res.send(fieldRespArray)
                    }
                });
            } else {
                res.send(resp)
            }
        }))
    },
    fetchDataForPage: (req, res, next) => {
        res["companyQuery"] = { query: { "data_stat_cd": "A" }, project: {} }
        fldsRepo.getFldsData(req, res, ((err, resp) => {
            if (err) {
                console.log("Error", "fldsMiddleware", "getFldsData", err)
                res.send(err)
            } else {
                console.log("Response", "fldsMiddleware", "getFldsData", resp)
                res.send(resp)
            }
        }))
    },
}