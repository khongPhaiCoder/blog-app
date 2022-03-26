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
        })
        .populate({
            path: "comments",
            select: "author content like dislike",
            populate: {
                path: "author",
                select: "username email profilePicture",
            },
        });
};

PostService.isExist = async (id) => {
    return await PostModel.exists({ _id: id });
};

PostService.newPost = async (payload) => {
    const post = new PostModel(payload);
    return await post.save();
};

PostService.deletePost = async (id) => {
    return await PostModel.findByIdAndDelete(id);
};

PostService.updatePost = async (id, payload) => {
    return await PostModel.findByIdAndUpdate(id, {
        $set: payload,
    });
};

PostService.addLike = async (postId, userId) => {
    return await PostModel.findByIdAndUpdate(postId, {
        $push: { likes: userId },
    });
};

PostService.addDislike = async (postId, userId) => {
    return await PostModel.findByIdAndUpdate(postId, {
        $push: { dislike: userId },
    });
};

PostService.removeLike = async (postId, userId) => {
    return await PostModel.findByIdAndUpdate(postId, {
        $pull: { likes: userId },
    });
};

PostService.removeDislike = async (postId, userId) => {
    return await PostModel.findByIdAndUpdate(postId, {
        $pull: { dislike: userId },
    });
};

PostService.addComment = async (postId, commentId) => {
    return await PostModel.findByIdAndUpdate(postId, {
        $push: { comments: commentId },
    });
};

module.exports = PostService;
