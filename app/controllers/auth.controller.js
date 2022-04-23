const config = require("../config/auth.config");
const db = require("../models");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var generic = new Schema({});
var connectDb = require("../../clientsdb");
var libs = require("../common/libs");
var app = libs.express();
let userDb=require("../models/user")
var UserSchema = new Schema(userDb);
// const User = db.user;
// const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  console.log("singnup_____",req.body)
  var bodyData = req.body
  let db = connectDb("SI01")
  db.models = {}
  let User = db.model("User", UserSchema);
  const user = new User({
    username: bodyData.name,
    email: bodyData.email,
    password: bcrypt.hashSync(bodyData.password, 8)
  });
  user.save((err, user) => {
    console.log(user,"user save info")
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      console.log("hited saved user and checking for error")
      let db = connectDb("SI01")
      db.models = {}
      let Role = db.model("Role", generic);
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          console.log("error_on_role")
          res.status(500).send({ message: err });
          return;
        }

        console.log("resp_on_role")
        user.roles = [role._id];
        user.save(err => {
          if (err) {

            console.log("error_on_role_save")
            res.status(500).send({ message: err });
            return;
          }
          console.log("_on_role_resp")

          res.status(200).send({result:"success", message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  var bodyData = req.body
  console.log(req.body, "signin hitted", req.body.password)
  req = { headers: { "clientDbId": "BaseTest;surya@gmail.com;1" } }
  let db = connectDb(req.headers['clientDbId'].split(";")[0])
  db.models = {}
  let User = db.model("User", generic);
  User.findOne({
    username: bodyData.userID
  })
    .populate("roles", "-__v")
    .exec((err, userData) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else if (!userData) {
        return res.status(404).send({ message: "User Not found." });
      } else {
        var userInput = JSON.parse(JSON.stringify(userData))
        var passwordIsValid = bcrypt.compareSync(bodyData.password, userInput.password);

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }

        var token = jwt.sign({ id: userInput.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });

        var authorities = [];

        for (let i = 0; i < userInput.roles.length; i++) {
          authorities.push("ROLE_" + userInput.roles[i].name.toUpperCase());
        }
        res.status(200).send({result:{
          id: userInput._id,
          username: userInput.username,
          email: userInput.email,
          roles: authorities,
          accessToken: token
        },message:"Login Success"});
      }
    });
};
