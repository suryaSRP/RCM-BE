
const programController = require("../controllers/program.controller")
module.exports = {
    eventList: (req, res, next) => {
        programController.getEventList(req, res).then((data)=>{
            res.send(data)
        })
    },
    eventOperations: (req, res, next) => {
        programController.createEventController(req, res, ((resp) => {
            res.send(resp)
        }))
    },
}