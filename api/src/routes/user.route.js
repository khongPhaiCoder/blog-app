const router = require("express").Router();

const UserController = require("../controllers/user.controller");
const UserMiddleware = require("../middleware/user.middleware");
const requestValidation = require("../middleware/request-validation.middleware");
const authenticationMiddleware = require("../middleware/authentication.middleware");

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
    .delete(UserController.deleteUser);

module.exports = router;
