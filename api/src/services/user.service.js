const UserModel = require("../models/user.model");

const UserService = {};

UserService.newUser = async (payload) => {
    const user = new UserModel(payload);
    return await user.save();
};

UserService.findByField = async (payload) => {
    return await UserModel.find(payload).populate({
        path: "roles",
        select: "name",
    });
};

UserService.updateUser = async (...payload) => {
    return await UserModel.findByIdAndUpdate(...payload);
};

UserService.deleteUser = async (id) => {
    return await UserModel.findByIdAndDelete(id);
};

UserService.isExist = async (id) => {
    return await UserModel.exists({ _id: id });
};

module.exports = UserService;
