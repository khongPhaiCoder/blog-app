const { body, param } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;

const UserMiddleware = {};

UserMiddleware.paramsValidation = [param("userId").isMongoId()];

UserMiddleware.bodyUpdateValidation = [
    body("username")
        .optional()
        .isLength({ min: 3 })
        .withMessage("username must have at least 3 characters"),
    body("roles")
        .optional()
        .isArray()
        .custom((value) => {
            for (let item of value) {
                if (!ObjectId.isValid(item)) {
                    return Promise.reject("Invalid value!");
                }
            }
            return true;
        }),
];

module.exports = UserMiddleware;
