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

UserService.updateUser = async (id, payload) => {
    return await UserModel.findByIdAndUpdate(
        id,
        { $set: payload },
        { new: true }
    );
};

module.exports = UserService;
