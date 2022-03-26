const CommentModel = require("../models/comment.model");

const CommentService = {};

CommentService.newComment = async (payload) => {
    const comment = new CommentModel(payload);
    return await comment.save();
};

CommentService.findById = async (id) => {
    return await CommentModel.findById(id).populate({
        path: "author",
        select: "username profilePicture",
    });
};

CommentService.isExist = async (id) => {
    return await CommentModel.exists({ _id: id });
};

CommentService.updateComment = async (id, payload) => {
    return await CommentModel.findByIdAndUpdate(id, {
        $set: payload,
    });
};

CommentService.deleteComment = async (id) => {
    return await CommentModel.findByIdAndDelete(id);
};

CommentService.addLike = async (commentId, userId) => {
    return await CommentModel.findByIdAndUpdate(commentId, {
        $push: { like: userId },
    });
};

CommentService.removeLike = async (commentId, userId) => {
    return await CommentModel.findByIdAndUpdate(commentId, {
        $pull: { like: userId },
    });
};

CommentService.addDislike = async (commentId, userId) => {
    return await CommentModel.findByIdAndUpdate(commentId, {
        $push: { dislike: userId },
    });
};

CommentService.removeDislike = async (commentId, userId) => {
    return await CommentModel.findByIdAndUpdate(commentId, {
        $pull: { dislike: userId },
    });
};

module.exports = CommentService;
