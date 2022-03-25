const router = require("express").Router();
const RoleRoute = require("./role.route");
const AuthRoute = require("./auth.route");

router.use("/role", RoleRoute);
router.use("/auth", AuthRoute);

module.exports = router;
