const { StatusCodes } = require("http-status-codes");

const RoleService = require("../services/role.service");
const wrapAsync = require("../utils/wrap-async");
const { shortRole } = require("../utils/short-object");

const RoleController = {};

RoleController.newRole = wrapAsync(async (req, res, next) => {
    const { role } = req.body;
    const nRole = await RoleService.newRole({ name: role });

    res.status(StatusCodes.CREATED).json({
        message: "Role created",
        role_id: nRole._id.toString(),
    });
});

RoleController.getRoles = wrapAsync(async (req, res, next) => {
    const roles = await RoleService.findByField({});
    const shRoles = roles.map((item) => shortRole(item));

    res.status(StatusCodes.OK).json({
        message: "Get all roles",
        roles: shRoles,
    });
});

module.exports = RoleController;
