const { body, param } = require("express-validator");
const CustomError = require("../errors");
const RoleService = require("../services/role.service");

const RoleMiddleware = {};

RoleMiddleware.bodyValidation = [body("role").not().isEmpty()];

RoleMiddleware.paramValidation = [
    param("roleId")
        .isMongoId()
        .withMessage("Invalid id")
        .custom(async (value) => {
            if (!(await RoleService.isExist(value))) {
                throw new CustomError.NotFoundError(`Role ${value} not found`);
            }
            return true;
        }),
];

module.exports = RoleMiddleware;
