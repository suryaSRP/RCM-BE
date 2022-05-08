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
  app.get("/api/:fetchFldsForPage/fetchFlds", fldsMiddleware.fetchFldsForPage)
};
