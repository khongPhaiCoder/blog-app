const { StatusCodes } = require("http-status-codes");

const RoleService = require("../services/role.service");
const wrapAsync = require("../utils/wrap-async");
const { shortRole } = require("../utils/short-object");

const RoleController = {};

// @desc    Create new role
// @route   POST /api/role
// @access  Private/Admin
RoleController.newRole = wrapAsync(async (req, res, next) => {
    const { role } = req.body;
    const nRole = await RoleService.newRole({ name: role });

    res.status(StatusCodes.CREATED).json({
        message: "Role created",
        role_id: nRole._id.toString(),
    });
});

// @desc    Get all roles
// @route   GET /api/role
// @access  Private/Admin
RoleController.getRoles = wrapAsync(async (req, res, next) => {
    const roles = await RoleService.findByField({}, req.userId);

    res.status(StatusCodes.OK).json({
        message: "Get all roles",
        roles: roles,
    });
});

// @desc    Update role
// @route   PUT /api/role/:roleId
// @access  Private/Admin
RoleController.updateRole = wrapAsync(async (req, res, next) => {
    const { roleId } = req.params;
    const { role } = req.body;

    await RoleService.updateRole(roleId, { name: role });

    res.status(StatusCodes.OK).json({
        message: `Role ${roleId} updated`,
    });
});

// @desc    Delete role
// @route   DELETE /api/role/:roleId
// @access  Private/Admin
RoleController.deleteRole = wrapAsync(async (req, res, next) => {
    const { roleId } = req.params;

    await RoleService.deleteRole(roleId);

    res.status(StatusCodes.OK).json({
        message: `Role ${roleId} deleted`,
    });
});

module.exports = RoleController;
