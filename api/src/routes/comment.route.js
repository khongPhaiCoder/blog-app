const router = require("express").Router();

const CommentController = require("../controllers/comment.controller");
const CommentMiddleware = require("../middleware/comment.middleware");
const requestValidation = require("../middleware/request-validation.middleware");

router.post(
    "/",
    CommentMiddleware.bodyNewCommentValidation,
    requestValidation,
    CommentController.newComment
);

module.exports = router;
