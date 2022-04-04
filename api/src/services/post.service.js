const PostModel = require("../models/post.model");

const PostService = {};

PostService.findByField = async (payload, userId) => {
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
            select: "author content like dislike updatedAt",
            populate: {
                path: "author",
                select: "username email profilePicture",
            },
        })
        .cache({ key: userId || process.env.GUEST_ID });
};

PostService.getPostList = async (q = "", page = 1, userId) => {
    return await PostModel.find({
        title: { $regex: ".*" + q + ".*" },
    })
        .select(
            "author title categories likes dislike views comments updatedAt"
        )
        .sort({ updatedAt: -1 })
        .skip((page - 1) * 10)
        .limit(10)
        .populate({
            path: "categories",
            select: "name",
        })
        .populate({
            path: "author",
            select: "username email profilePicture",
        })
        .cache({ key: userId || process.env.GUEST_ID });
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

PostService.removeComment = async (postId, commentId) => {
    return await PostModel.findByIdAndUpdate(postId, {
        $pull: { comments: commentId },
    });
};

module.exports = PostService;
