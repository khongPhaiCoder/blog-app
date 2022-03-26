const { body, param, query } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;

const PostMiddleware = {};

PostMiddleware.bodyNewAndUpdatePostValidation = [
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

PostMiddleware.ReactValidation = [
    query("react")
        .not()
        .isEmpty()
        .isIn(["like", "dislike"])
        .withMessage("Unknown reaction"),
    param("postId").isMongoId(),
    body("userId").isMongoId(),
];

PostMiddleware.paramsValidation = [param("postId").isMongoId()];

module.exports = PostMiddleware;
