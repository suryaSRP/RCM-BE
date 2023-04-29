// import userController from "../controllers/user.controller";
const userController = require("../controllers/user.controller")

module.exports = {
    userOperations: (req, res, next) => {
        userController.createUserController(req, res, ((resp) => {
            res.send(resp)
        }))
    }
}