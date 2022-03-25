const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const UserMiddleware = require("../middleware/user.middleware");
const requestValidation = require("../middleware/request-validation.middleware");

router
    .route("/:userId")
    .all(UserMiddleware.paramsValidation, requestValidation)
    .get(UserController.getUser)
    .put(
        UserMiddleware.bodyUpdateValidation,
        requestValidation,
        UserController.updateUser
    )
    .delete(UserController.deleteUser);

module.exports = router;
