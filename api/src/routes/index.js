const router = require("express").Router();
const RoleRoute = require("./role.route");

router.use("/role", RoleRoute);

module.exports = router;
