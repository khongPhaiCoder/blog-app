const { StatusCodes } = require("http-status-codes");

const CommentService = require("../services/comment.service");
const wrapAsync = require("../utils/wrap-async");

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

CommentController.updateComment = wrapAsync(async (req, res, next) => {
    const { commentId } = req.params;
    const { content } = req.body;

    await CommentService.updateComment(commentId, { content: content });

    res.status(StatusCodes.OK).json({
        message: `Comment ${commentId} updated!`,
    });
});

CommentController.deleteComment = wrapAsync(async (req, res, next) => {
    const { commentId } = req.params;

    await CommentService.deleteComment(commentId);

    res.status(StatusCodes.OK).json({
        message: `Comment ${commentId} deleted`,
    });
});

CommentController.reactComment = wrapAsync(async (req, res, next) => {
    const { react } = req.query;
    const { commentId } = req.params;
    const { userId } = req.body;

    const comment = await CommentService.findById(commentId);

    if (react === "like") {
        if (comment._doc.like.includes(userId)) {
            await CommentService.removeLike(commentId, userId);
        } else {
            await CommentService.addLike(commentId, userId);
        }
        if (comment._doc.dislike.includes(userId)) {
            await CommentService.removeDislike(commentId, userId);
        }
    } else {
        if (comment._doc.dislike.includes(userId)) {
            await CommentService.removeDislike(commentId, userId);
        } else {
            await CommentService.addDislike(commentId, userId);
        }
        if (comment._doc.like.includes(userId)) {
            await CommentService.removeLike(commentId, userId);
        }
    }

    res.status(StatusCodes.OK).json({
        message: `React to comment ${commentId} successfully.`,
    });
});

module.exports = CommentController;
