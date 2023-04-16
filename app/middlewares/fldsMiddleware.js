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
        let clientId = req.headers['clientsid'].split(";")[0]
        let db = connectDb(clientId)
        db.models = {}
        let personInfos = db.model("personInfos", Schema({}, {
            collection: "personInfos"
        }));
        let positionMaster = db.model("positionMaster", Schema({}, {
            collection: "positionMaster"
        }));
        let query = { ...req.params.getQuery, ...{ "data_stat_cd": "A" } }
        res["companyQuery"] = { query, project: {} }
        fldsFetchController.getPageFlds(req, res, ((resp) => {
            if (resp.length > 0) {
                resp.forEach((field, idx, array) => {
                    if (field.fld_nm == 'manager_name') {
                        console.log("manager_name_found")
                        personInfos.find({}).exec((err, emp) => {
                            emp = JSON.parse(JSON.stringify(emp))
                            emp.forEach((data, id, arr) => {
                                field.options.push({ "id": data.ee_id, "name": data.sort_frmt_nm })
                                // if (id === arr.length - 1) {
                                //     // console.log(resp,"response_done")
                                //     // res.send(resp)
                                // }
                            })
                        })
                    } else if (field.fld_nm == 'pstn_id') {
                        console.log("pstn_id_found")
                        positionMaster.find({ "isVacant": true, "data_stat_cd": "A", }).exec((err, emp) => {
                            emp = JSON.parse(JSON.stringify(emp))
                            emp.forEach((data, ide, arry) => {
                                field.options.push({ "id": data.pstn_id, "name": data.pstn_titl_tx, "org_unit_id": data.org_unit_id })
                                // if (ide === arry.length - 1) {
                                //     // console.log(resp,"response_done")
                                //     // res.send(resp)
                                // }
                            })
                        })
                    } else {

                        if (idx === array.length - 1) { res.send(resp) }
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