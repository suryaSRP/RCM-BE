const { authJwt } = require("../middlewares");
const baseMiddleware = require("../middlewares/baseMiddleware");
const fldsMiddleware = require("../middlewares/fldsMiddleware")
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/companyDtls", baseMiddleware.companyDocuments);
  app.get("/api/orgInfoDtls", baseMiddleware.orgInfosDocuments);
  app.get("/api/prsnMenuDtls", baseMiddleware.prsnMenuDtls);
  app.get("/api/pstnDtls/:orgId", baseMiddleware.prsnInfoDocuments)
  app.get("/api/:fetchFldsForPage/fetchFlds/:getQuery", fldsMiddleware.fetchFldsForPage)
  app.get("/api/:page/:fetchID", fldsMiddleware.fetchDataForPage)
  app.post("/api/deleteData/:collectionName/:dataId", baseMiddleware.deleteMode)
  app.post("/api/edit/:pageToedit/:id", baseMiddleware.editMode)
  app.get("/api/info/:collectionName/:dataId", baseMiddleware.infoMode)


//create and Update ORG, Position and Employee details  
  app.post("/api/:pageToCreate/create", baseMiddleware.createMode)
  app.post("/api/:pageToCreate/update/:dataId", baseMiddleware.updateMode)
};
