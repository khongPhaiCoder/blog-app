const { body } = require("express-validator");

const RoleMiddleware = {};

RoleMiddleware.bodyNewRoleValidation = [body("role").not().isEmpty()];

module.exports = RoleMiddleware;
