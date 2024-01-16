const { checkDuplicateEmail, checkRolesExisted } = require("../middleware/verifySignUp.middleware");
const { checkIfStillValid } = require("../middleware/verifyUser.middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/signup",
    [
      checkDuplicateEmail,
      checkRolesExisted
    ],
    controller.signup
  );

  app.post(
    "/signin", 
    [
      checkIfStillValid
    ], 
    controller.signin
  );

  app.post("/check", checkIfStillValid)

  app.post("/signout", controller.signout);
};