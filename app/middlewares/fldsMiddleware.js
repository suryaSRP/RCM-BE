const fldsFetchController = require("../controllers/fldsFetchController")

module.exports = {
    
    fetchFldsForPage: (req, res, next) => {
        req["headers"] = { clientsid: "SI01;surya@ambu.com;1" }
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
}