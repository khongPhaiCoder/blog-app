const { body, param } = require("express-validator");

const UserService = require("../services/user.service");
const PostService = require("../services/post.service");
const CommentService = require("../services/comment.service");
const CustomError = require("../errors/index");

const CommentMiddleware = {};

CommentMiddleware.bodyNewCommentValidation = [
    body("author")
        .isMongoId()
        .custom(async (value) => {
            if (!(await UserService.isExist(value))) {
                throw new CustomError.NotFoundError(`User ${value} not found!`);
            }
            return true;
        }),
    body("post")
        .isMongoId()
        .custom(async (value) => {
            if (!(await PostService.isExist(value))) {
                throw new CustomError.NotFoundError(`Post ${value} not found!`);
            }
            return true;
        }),
    body("replyTo")
        .optional()
        .isMongoId()
        .custom(async (value) => {
            if (!(await CommentService.isExist(value))) {
                throw new CustomError.NotFoundError(
                    `Comment ${value} not found!`
                );
            }
            return true;
        }),
    body("content").not().isEmpty(),
];

CommentMiddleware.paramValidation = [
    param("commentId")
        .isMongoId()
        .custom(async (value) => {
            if (!(await CommentService.isExist(value))) {
                throw new CustomError.NotFoundError(
                    `Comment ${value} not found!`
                );
            }
            return true;
        }),
];

CommentMiddleware.bodyUpdateValidation = [
    body("content").not().isEmpty().withMessage("Content is required!"),
];

module.exports = CommentMiddleware;
