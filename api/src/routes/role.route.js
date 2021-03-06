const router = require("express").Router();

const RoleController = require("../controllers/role.controller");
const RoleMiddleware = require("../middleware/role.middleware");
const requestValidation = require("../middleware/request-validation.middleware");
const authenticationMiddleware = require("../middleware/authentication.middleware");
const cleanCache = require("../middleware/clean-cache.middleware");

router
    .route("/")
    .all(
        authenticationMiddleware.authenticateUser,
        authenticationMiddleware.authorizePermissions
    )
    .get(RoleController.getRoles)
    .post(
        authenticationMiddleware.adminPermissions,
        RoleMiddleware.bodyValidation,
        requestValidation,
        cleanCache,
        RoleController.newRole
    );

router
    .route("/:roleId")
    .all(
        authenticationMiddleware.authenticateUser,
        authenticationMiddleware.adminPermissions,
        RoleMiddleware.paramValidation,
        requestValidation
    )
    .put(
        RoleMiddleware.bodyValidation,
        requestValidation,
        cleanCache,
        RoleController.updateRole
    )
    .delete(cleanCache, RoleController.deleteRole);

module.exports = router;
