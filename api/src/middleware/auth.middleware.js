const { body } = require("express-validator");

const AuthMiddleware = {};

AuthMiddleware.bodyRegisterValidation = [
    body("username")
        .not()
        .isEmpty()
        .withMessage("username is required")
        .isLength({ min: 3 })
        .withMessage("username must have at least 3 characters"),
    body("email")
        .not()
        .isEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("please enter valid email")
        .normalizeEmail(),
    body("password")
        .not()
        .isEmpty()
        .withMessage("password is required")
        .isLength({ min: 6 })
        .withMessage("password must have at least 6 characters"),
];

AuthMiddleware.bodyLoginValidation = [
    body("email")
        .not()
        .isEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("please enter valid email")
        .normalizeEmail(),
    body("password").not().isEmpty().withMessage("password is required"),
];

module.exports = AuthMiddleware;
