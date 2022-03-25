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

module.exports = router;
