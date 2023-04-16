const baseFileController = require("../controllers/baseFileController")
module.exports = {
    companyDocuments: (req, res, next) => {
        req["headers"] = { clientsid: "SI01;surya@ambu.com;1" }
        res["companyQuery"] = { query: { "data_stat_cd": "A" }, project: {} }
        baseFileController.companyDetails(req, res, ((err, resp) => {

            if (err) {
                console.log("Error", "baseMiddleware", "companyDocuments", err)
                res.send(err)
            } else {
                res.send(resp)
            }
        }))
    },
    orgInfosDocuments: (req, res, next) => {
        req["headers"] = { clientsid: "SI01;surya@ambu.com;1" }
        res["orgInfosQuery"] = { query: { "data_stat_cd": "A" }, project: {} }
        baseFileController.orgInfosDetails(req, res, ((err, resp) => {

            if (err) {
                console.log("Error", "baseMiddleware", "orgInfosDocuments", err)
                res.send(err)
            } else {
                res.send(resp)
            }
        }))
    },

    prsnInfoDocuments: (req, res, next) => {
        console.log(req.params, "console.log(req.params.id);");
        req["headers"] = { clientsid: "SI01;surya@ambu.com;1" }
        console.log(req, "req_headerrrrrrrrrr")
        res["pstnMasterQuery"] = { query: { "org_unit_id": req.params.orgId, "data_stat_cd": "A" }, project: {} }
        baseFileController.pstnMasterDetails(req, res, ((err, resp) => {

            if (err) {
                console.log("Error", "baseMiddleware", "prsnInfoDocuments", err)
                res.send(err)
            } else {
                res.send(resp)
            }
        }))
    },
    prsnMenuDtls: (req, res) => {
        baseFileController.companyWithOrgDetails(req, res, ((err, resp) => {
            if (err) {
                console.log("Error", "baseMiddleware", "prsnMenuDtls", err)
                res.send(err)
            } else {
                console.log("Info", "baseMiddleware", "prsnMenuDtls", "data received")
                res.send(resp)
            }
        }))
    },
    createMode: (req, res) => {
        baseFileController.createActionModule(req, res, (resp => {
            console.log("Info", "baseMiddleware", "createMode", "response received")
            res.send(resp)

        }))
    },

    updateMode: (req, res) => {
        baseFileController.updateActionModule(req, res, (resp => {
            console.log("Info", "baseMiddleware", "updateMode", "response received")
            res.send(resp)

        }))
    },
    deleteMode: (req, res) => {
        baseFileController.deleteActionModule(req, res, (resp => {
            console.log("Info", "baseMiddleware", "deleteMode", "response received")
            res.send(resp)

        }))
    },
    editMode: (req, res) => {
        baseFileController.editActionModule(req, res, (resp => {
            console.log("Info", "baseMiddleware", "deleteMode", "response received")
            res.send(resp)

        }))
    },
    infoMode: (req, res) => {
        baseFileController.infoActionModule(req, res, (resp => {
            console.log("Info", "baseMiddleware", "deleteMode", "response received")
            res.send(resp)

        }))
    },
}