const router = require("express").Router();

const UserController = require("../controllers/user.controller");
const UserMiddleware = require("../middleware/user.middleware");
const requestValidation = require("../middleware/request-validation.middleware");
const authenticationMiddleware = require("../middleware/authentication.middleware");

router.get(
    "/",
    authenticationMiddleware.authenticateUser,
    authenticationMiddleware.adminPermissions,
    UserController.findUsers
);

router.get("/authors", UserController.getAuthors);

router
    .route("/:userId")
    .all(UserMiddleware.paramsValidation, requestValidation)
    .get(UserController.getUser)
    .all(
        authenticationMiddleware.authenticateUser,
        authenticationMiddleware.authorizePermissions
    )
    .put(
        UserMiddleware.bodyUpdateValidation,
        requestValidation,
        UserController.updateUser
    )
    .delete(
        authenticationMiddleware.adminPermissions,
        UserController.deleteUser
    );

module.exports = router;
