const PostModel = require("../models/post.model");

const PostService = {};

PostService.findByField = async (payload) => {
    return await PostModel.find(payload)
        .populate({
            path: "categories",
            select: "name",
        })
        .populate({
            path: "author",
            select: "username email profilePicture",
        });
};

PostService.isExist = async (id) => {
    return await PostModel.exists({ _id: id });
};

PostService.newPost = async (payload) => {
    const post = new PostModel(payload);
    return await post.save();
};

PostService.addComment = async (id, commentId) => {
    return await PostModel.findByIdAndUpdate(id, {
        $push: { comments: commentId },
    });
};

PostService.deletePost = async (id) => {
    return await PostModel.findByIdAndDelete(id);
};

module.exports = PostService;
