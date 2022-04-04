const RoleModel = require("../models/role.model");

const RoleService = {};

RoleService.newRole = async (payload) => {
    const role = new RoleModel(payload);
    return await role.save();
};

RoleService.findByField = async (payload, userId) => {
    return await RoleModel.find(payload)
        .select("-updatedAt -createdAt -__v")
        .cache({ key: userId });
};

RoleService.isExist = async (id) => {
    return await RoleModel.exists({ _id: id });
};

RoleService.updateRole = async (id, payload) => {
    return await RoleModel.findByIdAndUpdate(id, {
        $set: payload,
    });
};

RoleService.deleteRole = async (id) => {
    return await RoleModel.findByIdAndDelete(id);
};

module.exports = RoleService;
