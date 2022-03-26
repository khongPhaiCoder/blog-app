const { body, param } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;

const UserService = require("../services/user.service");
const RoleService = require("../services/role.service");

const UserMiddleware = {};

UserMiddleware.paramsValidation = [
    param("userId")
        .isMongoId()
        .custom(async (value) => {
            if (!(await UserService.isExist(value))) {
                return Promise.reject(`User ${value} not found!`);
            }
            return true;
        }),
];

UserMiddleware.bodyUpdateValidation = [
    body("username")
        .optional()
        .isLength({ min: 3 })
        .withMessage("username must have at least 3 characters"),
    body("roles")
        .optional()
        .isArray()
        .custom(async (value) => {
            for (let item of value) {
                if (!ObjectId.isValid(item)) {
                    return Promise.reject("Invalid value!");
                }
                if (!(await RoleService.isExist(item))) {
                    return Promise.reject(`Role ${item} not found!`);
                }
            }
            return true;
        }),
];

module.exports = UserMiddleware;
