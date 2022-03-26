const apiRouter = require("express").Router();

const RoleRoute = require("./role.route");
const AuthRoute = require("./auth.route");
const UserRoute = require("./user.route");
const CategoryRoute = require("./category.route");
const CommentRoute = require("./comment.route");
const PostRoute = require("./post.route");

apiRouter.use("/role", RoleRoute);
apiRouter.use("/auth", AuthRoute);
apiRouter.use("/user", UserRoute);
apiRouter.use("/category", CategoryRoute);
apiRouter.use("/comment", CommentRoute);
apiRouter.use("/post", PostRoute);

module.exports = apiRouter;
