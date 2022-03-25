const apiRouter = require("express").Router();
const RoleRoute = require("./role.route");
const AuthRoute = require("./auth.route");
const UserRoute = require("./user.route");

apiRouter.use("/role", RoleRoute);
apiRouter.use("/auth", AuthRoute);
apiRouter.use("/user", UserRoute);

module.exports = apiRouter;
