const { body, param, query } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;

const PostService = require("../services/post.service");
const UserService = require("../services/user.service");
const CategoryService = require("../services/category.service");
const CustomError = require("../errors/index");

const PostMiddleware = {};

PostMiddleware.bodyNewAndUpdatePostValidation = [
    body("title").not().isEmpty(),
    body("content").not().isEmpty(),
    body("categories")
        .isArray()
        .custom(async (value) => {
            for (let item of value) {
                if (!ObjectId.isValid(item)) {
                    throw new CustomError.BadRequestError("Invalid value!");
                }
                if (!(await CategoryService.isExist(item))) {
                    throw new CustomError.NotFoundError(
                        `Category ${value} not found!`
                    );
                }
            }
            return true;
        }),
];

PostMiddleware.reactValidation = [
    query("react")
        .not()
        .isEmpty()
        .isIn(["like", "dislike"])
        .withMessage("Unknown reaction"),
    param("postId")
        .isMongoId()
        .custom(async (value) => {
            if (!(await PostService.isExist(value))) {
                throw new CustomError.NotFoundError(`Post ${value} not found!`);
            }
            return true;
        }),
];

PostMiddleware.paramsValidation = [
    param("postId")
        .isMongoId()
        .custom(async (value) => {
            if (!(await PostService.isExist(value))) {
                throw new CustomError.NotFoundError(`Post ${value} not found!`);
            }
            return true;
        }),
];

module.exports = PostMiddleware;
