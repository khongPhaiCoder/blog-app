const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const CommentService = require("../services/comment.service");
const wrapAsync = require("../utils/wrap-async");

const CommentController = {};

// @desc    Create new comment
// @route   POST /api/comment
// @access  Private
CommentController.newComment = wrapAsync(async (req, res, next) => {
    const { post, content } = req.body;

    const comment = await CommentService.newComment({
        author: req.userId,
        post: post,
        content: content,
    });

    res.status(StatusCodes.CREATED).json({
        message: "Comment created",
        comment_id: comment._id.toString(),
    });
});

// @desc    Update comment
// @route   PUT /api/comment/:commentId
// @access  Private
CommentController.updateComment = wrapAsync(async (req, res, next) => {
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await CommentService.findById(commentId, req.userId);

    if (req.userId !== comment._doc.author._id.toString()) {
        throw new CustomError.UnauthorizedError(
            "Unauthorized to access this route"
        );
    }

    await CommentService.updateComment(commentId, { content: content });

    res.status(StatusCodes.OK).json({
        message: `Comment ${commentId} updated!`,
    });
});

// @desc    Delete comment
// @route   DELETE /api/comment/:commentId
// @access  Private
CommentController.deleteComment = wrapAsync(async (req, res, next) => {
    const { commentId } = req.params;

    const comment = await CommentService.findById(commentId, req.userId);

    if (
        !req.roles.includes("ADMIN") &&
        req.userId !== comment._doc.author._id.toString()
    ) {
        throw new CustomError.UnauthorizedError(
            "Unauthorized to access this route"
        );
    }

    await CommentService.deleteComment(commentId);

    res.status(StatusCodes.OK).json({
        message: `Comment ${commentId} deleted`,
    });
});

// @desc    React to a comment (like/dislike)
// @route   POST /api/comment/:commentId/react?react=like|dislike
// @access  Private
CommentController.reactComment = wrapAsync(async (req, res, next) => {
    const { react } = req.query;
    const { commentId } = req.params;
    const userId = req.userId;

    const comment = await CommentService.findById(commentId, req.userId);

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
