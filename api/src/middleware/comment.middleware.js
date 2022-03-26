const { body } = require("express-validator");

const UserService = require("../services/user.service");
const PostService = require("../services/post.service");
const CommentService = require("../services/comment.service");

const CommentMiddleware = {};

CommentMiddleware.bodyNewCommentValidation = [
    body("author")
        .isMongoId()
        .custom(async (value) => {
            if (!(await UserService.isExist(value))) {
                return Promise.reject(`User ${value} not found!`);
            }
            return true;
        }),
    body("post")
        .isMongoId()
        .custom(async (value) => {
            if (!(await PostService.isExist(value))) {
                return Promise.reject(`Post ${value} not found!`);
            }
            return true;
        }),
    body("replyTo")
        .optional()
        .isMongoId()
        .custom(async (value) => {
            if (!(await CommentService.isExist(value))) {
                return Promise.reject(`Comment ${value} not found!`);
            }
            return true;
        }),
    body("content").not().isEmpty(),
];

module.exports = CommentMiddleware;
