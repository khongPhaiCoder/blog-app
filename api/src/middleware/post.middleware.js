const { body } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;

const PostMiddleware = {};

PostMiddleware.bodyNewPostValidation = [
    body("author").isMongoId(),
    body("content").not().isEmpty(),
    body("categories")
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

module.exports = PostMiddleware;
