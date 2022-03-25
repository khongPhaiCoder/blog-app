const router = require("express").Router();

const AuthController = require("../controllers/auth.controller");
const AuthMiddleware = require("../middleware/auth.middleware");
const requestValidation = require("../middleware/request-validation.middleware");

router.post(
    "/register",
    AuthMiddleware.bodyRegisterValidation,
    requestValidation,
    AuthController.register
);

router.post(
    "/login",
    AuthMiddleware.bodyLoginValidation,
    requestValidation,
    AuthController.login
);

module.exports = router;
