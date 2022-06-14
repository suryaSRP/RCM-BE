const fldsFetchController = require("../controllers/fldsFetchController")
const fldsRepo = require("../repository/fldsFetchRepo")

module.exports = {
    
    fetchFldsForPage: (req, res, next) => {
        res["companyQuery"] = { query: { "data_stat_cd": "A" }, project: {} }
        fldsFetchController.getPageFlds(req, res, ((err, resp) => {
            if (err) {
                console.log("Error", "fldsMiddleware", "fetchFldsForPage", err)
                res.send(err)
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