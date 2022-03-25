const router = require("express").Router();
const RoleController = require("../controllers/role.controller");
const RoleMiddleware = require("../middleware/role.middleware");
const requestValidation = require("../middleware/request-validation.middleware");

router
    .route("/")
    .get(RoleController.getRoles)
    .post(
        RoleMiddleware.bodyNewRoleValidation,
        requestValidation,
        RoleController.newRole
    );

module.exports = router;
