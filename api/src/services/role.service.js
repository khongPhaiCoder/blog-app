const RoleModel = require("../models/role.model");

const RoleService = {};

RoleService.newRole = async (payload) => {
    const role = new RoleModel(payload);
    return await role.save();
};

RoleService.findByField = async (payload) => {
    return await RoleModel.find(payload);
};

module.exports = RoleService;
