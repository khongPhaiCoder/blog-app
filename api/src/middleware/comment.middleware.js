const { body } = require("express-validator");

const CommentMiddleware = {};

CommentMiddleware.bodyNewCommentValidation = [
    body("author").isMongoId(),
    body("post").isMongoId(),
    body("replyTo").optional().isMongoId(),
    body("content").not().isEmpty(),
];

module.exports = CommentMiddleware;
