const CommentModel = require("../models/comment.model");

const CommentService = {};

CommentService.newComment = async (payload) => {
    const comment = new CommentModel(payload);
    return await comment.save();
};

CommentService.findById = async (id) => {
    return await CommentModel.findById(id)
        .populate({
            path: "author",
            select: "username profilePicture",
        })
        .populate("replies");
};

CommentService.isExist = async (id) => {
    return await CommentModel.exists({ _id: id });
};

CommentService.updateComment = async (id, payload) => {
    return await CommentModel.findByIdAndUpdate(id, {
        $set: payload,
    });
};

module.exports = CommentService;
