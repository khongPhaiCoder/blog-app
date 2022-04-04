const UserModel = require("../models/user.model");

const UserService = {};

UserService.newUser = async (payload) => {
    const user = new UserModel(payload);
    return await user.save();
};

UserService.findByField = async (payload, userId) => {
    return await UserModel.find(payload)
        .populate({
            path: "roles",
            select: "name",
        })
        .cache({ key: userId });
};

UserService.updateUser = async (id, payload) => {
    return await UserModel.findByIdAndUpdate(id, {
        $set: payload,
    });
};

UserService.deleteUser = async (id) => {
    return await UserModel.findByIdAndDelete(id);
};

UserService.isExist = async (id) => {
    return await UserModel.exists({ _id: id });
};

UserService.addPost = async (userId, postId) => {
    return await UserModel.findByIdAndUpdate(userId, {
        $push: { posts: postId },
    });
};

UserService.removePost = async (userId, postId) => {
    return await UserModel.findByIdAndUpdate(userId, {
        $pull: { posts: postId },
    });
};

UserService.getAuthors = async (userId) => {
    return await UserModel.aggregate()
        .addFields({ numPosts: { $size: "$posts" } })
        .sort({ numPosts: -1 })
        .limit(5)
        .cache({ key: userId });
};

UserService.findUsers = async (q = "", page = 1, userId) => {
    return await UserModel.find({
        username: { $regex: ".*" + q + ".*" },
    })
        .select("username email profilePicture posts roles")
        .sort({ updatedAt: -1 })
        .skip((page - 1) * 10)
        .limit(10)
        .populate({
            path: "roles",
            select: "name",
        })
        .cache({ key: userId });
};

module.exports = UserService;
