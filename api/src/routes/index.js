const apiRouter = require("express").Router();
const RoleRoute = require("./role.route");
const AuthRoute = require("./auth.route");
const UserRoute = require("./user.route");
const CategoryRoute = require("./category.route");

apiRouter.use("/role", RoleRoute);
apiRouter.use("/auth", AuthRoute);
apiRouter.use("/user", UserRoute);
apiRouter.use("/category", CategoryRoute);

module.exports = apiRouter;
