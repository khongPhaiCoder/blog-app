const router = require("express").Router();

const RoleController = require("../controllers/role.controller");
const RoleMiddleware = require("../middleware/role.middleware");
const requestValidation = require("../middleware/request-validation.middleware");
const authenticationMiddleware = require("../middleware/authentication.middleware");

router
    .route("/")
    .all(
        authenticationMiddleware.authenticateUser,
        authenticationMiddleware.authorizePermissions
    )
    .get(RoleController.getRoles)
    .post(
        RoleMiddleware.bodyNewRoleValidation,
        requestValidation,
        RoleController.newRole
    );

module.exports = router;
