const CommentService = require("../services/comment.service");
const UserService = require("../services/user.service");
const PostService = require("../services/post.service");
const wrapAsync = require("../utils/wrap-async");
const CustomError = require("../errors/index");
const { StatusCodes } = require("http-status-codes");

const CommentController = {};

CommentController.newComment = wrapAsync(async (req, res, next) => {
    const { author, post, replyTo, content } = req.body;

    if (!(await UserService.isExist(author))) {
        throw new CustomError.NotFoundError(`Author ${author} not found!`);
    }

    if (!(await PostService.isExist(post))) {
        throw new CustomError.NotFoundError(`Post ${post} not found!`);
    }

    let parentComment;
    if (replyTo) {
        if (!(await CommentService.isExist(replyTo))) {
            throw new CustomError.NotFoundError(
                `Comment ${replyTo} not found!`
            );
        }
        parentComment = await CommentService.findById(replyTo);
    }

    const comment = await CommentService.newComment({
        author: author,
        post: post,
        content: content,
    });

    if (parentComment) {
        await CommentService.reply(replyTo, comment._id.toString());
    }

    res.status(StatusCodes.CREATED).json({
        message: "Comment created",
        comment_id: comment._id.toString(),
    });
});

module.exports = CommentController;