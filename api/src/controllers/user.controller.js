const { StatusCodes } = require("http-status-codes");

const UserService = require("../services/user.service");
const wrapAsync = require("../utils/wrap-async");
const clearImage = require("../utils/clear-image");
const { shortUser } = require("../utils/short-object");
const CustomError = require("../errors");

const UserController = {};

// @desc    Update user account
// @route   PUT /api/user/:userId
// @access  Private
UserController.updateUser = wrapAsync(async (req, res, next) => {
    const { userId } = req.params;

    const user = (await UserService.findByField({ _id: userId }))[0];

    if (req.userId !== userId && !req.roles.includes("ADMIN")) {
        throw new CustomError.UnauthorizedError(
            "Unauthorized to access this route"
        );
    }

    const { username, roles } = req.body;
    const updateInfo = { username };

    if (req.roles.includes("ADMIN") && roles) {
        updateInfo.roles = roles;
    }

    if (req.files && req.files.profilePicture) {
        if (user.profilePicture !== process.env.DEFAULT_PROFILE_PICTURE) {
            clearImage(user.profilePicture);
        }
        updateInfo.profilePicture = req.files.profilePicture[0].filename;
    }

    await UserService.updateUser(userId, updateInfo);

    res.status(StatusCodes.OK).json({
        message: "Account updated!",
    });
});

// @desc    Delete user account
// @route   DELETE /api/user/:userId
// @access  Private/Admin
UserController.deleteUser = wrapAsync(async (req, res, next) => {
    const { userId } = req.params;

    await UserService.deleteUser(userId);

    res.status(StatusCodes.OK).json({
        message: "User deleted!",
    });
});

// @desc    Get user by id
// @route   GET /api/user/:userId
// @access  Public
UserController.getUser = wrapAsync(async (req, res, next) => {
    const { userId } = req.params;

    const user = (await UserService.findByField({ _id: userId }))[0];

    const shUser = shortUser(user);

    res.status(StatusCodes.OK).json({
        message: `user ${userId}`,
        user: { ...shUser, posts: undefined },
    });
});

// @desc    Get top authors
// @route   GET /api/user/authors
// @access  Public
UserController.getAuthors = wrapAsync(async (req, res, next) => {
    const users = await UserService.getAuthors();

    const userList = users.map((user) => shortUser(user));

    res.status(StatusCodes.OK).json({
        message: "Get top authors",
        authors: userList,
    });
});

// @desc    Find user
// @route   GET /api/user
// @access  Private/Admin
UserController.findUsers = wrapAsync(async (req, res, next) => {
    const { q, page } = req.query;
    const users = await UserService.findUsers(q, page);

    res.status(StatusCodes.OK).json({
        message: "Find users",
        users: users,
    });
});

module.exports = UserController;
