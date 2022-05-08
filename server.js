const express = require("express");
const cors = require("cors");
var http = require('http');
const dbConfig = require("./app/config/db.config");
var libs = require("./app/common/libs");
global.response = require('response');
var app = libs.express();
var router = libs.express.Router();
var httpServer = http.createServer(app);
var config = require('./config/config')
const events = require('events');
const eventEmitter = new events.EventEmitter();
const { MongoClient } = require("mongodb");
var mongoose = require("mongoose");
var port = 5000;
var connectDb = require("./clientsdb");
var Schema = mongoose.Schema;
var generic = new Schema({});

// const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "x-timezone-offset,admin-owner,admin-id,lang_id,ee_id,clientsid,X-Requested-With,x-access-token,Content-Type,Authorization,role,prsn_intn_id,ee_id,access_orgs,access_company,job_access"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Expose-Headers", "token,admin-owner,admin-id,role,prsn_intn_id,ee_id,access_orgs,access_company,job_access");

  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  req.headers['admin-owner'] = req.headers['admin-owner'] ? req.headers['admin-owner'] : req.headers['clientsid'] ? req.headers['clientsid'].split(";")[1] : null;
  next();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// const db = require("./app/models");
// const Role = db.role;

// db.mongoose
//   .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("Successfully connect to MongoDB.");
//     initial();
//   })
//   .catch(err => {
//     console.error("Connection error", err);
//     process.exit();
//   });

var mongoDB = 'mongodb://localhost:27017/';

//Get the default connection
var db = mongoose.connection;
console.log('Surya: mongoose.connection.readyState', mongoose.connection.readyState)
db.on('connecting', function () {
  console.log('connecting to MongoDB...');
});

db.on('error', function (error) {
  console.error('Error in MongoDb connection: ' + error);
  mongoose.disconnect();
});
db.on('connected', function () {
  console.log('MongoDB connected!');
});
db.once('open', function () {
  console.log('MongoDB connection opened!');
});
db.on('reconnected', function () {
  console.log('MongoDB reconnected!');
});
db.on('disconnected', function () {
  console.log('MongoDB disconnected!');
  // mongoose.connect(config.getQualifiedDBUrlNoClient(), { server: { auto_reconnect: true } });
  mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
});
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(config.getQualifiedDBUrlNoClient(),"config.getQualifiedDBUrlNoClient()")
// mongoose.connect(config.getQualifiedDBUrlNoClient(), { server: { auto_reconnect: true } });
mongoose.Promise = global.Promise;
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Surya New application." });
});

app.get("/getClientDtls/:clientId", (req, res) => {
  console.log("hitted clientDtls")
  let db = connectDb("commonDb")
  db.models = {}
  let clientDetails = db.model("clientDetails", Schema({}, {
    collection: "clientDetails"
  }));
  clientDetails.find({
    clientCd: req.params.clientId,
    data_stat_cd: 'A'
  }).exec((err, clientData) => {
    if (err) {
      res.err({ data: err, message: "db error" })
    } else if (clientData.length > 0) {
      res.send({ data: clientData, message: "client Data Received" })
    } else {
      res.send({ data: [], message: "No User Found" })
    }
  })
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/baseRoutes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: "user"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'user' to roles collection");
//       });

//       new Role({
//         name: "moderator"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'moderator' to roles collection");
//       });

//       new Role({
//         name: "admin"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'admin' to roles collection");
//       });
//     }
//   });
// }
