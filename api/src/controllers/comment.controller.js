const { StatusCodes } = require("http-status-codes");

const CommentService = require("../services/comment.service");
const wrapAsync = require("../utils/wrap-async");
const CustomError = require("../errors/index");

const CommentController = {};

CommentController.newComment = wrapAsync(async (req, res, next) => {
    const { author, post, replyTo, content } = req.body;

    // let parentComment;
    // if (replyTo) {
    //     if (!(await CommentService.isExist(replyTo))) {
    //         throw new CustomError.NotFoundError(
    //             `Comment ${replyTo} not found!`
    //         );
    //     }
    //     parentComment = await CommentService.findById(replyTo);
    // }

    const comment = await CommentService.newComment({
        author: author,
        post: post,
        content: content,
    });

    // if (parentComment) {
    //     await CommentService.update(replyTo, {
    //         $push: { replies: comment._id.toString() },
    //     });
    // }

    res.status(StatusCodes.CREATED).json({
        message: "Comment created",
        comment_id: comment._id.toString(),
    });
});

module.exports = CommentController;
