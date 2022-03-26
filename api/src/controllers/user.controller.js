const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");

const UserService = require("../services/user.service");
const wrapAsync = require("../utils/wrap-async");
const clearImage = require("../utils/clear-image");
const { shortUser } = require("../utils/short-object");

const UserController = {};

UserController.updateUser = wrapAsync(async (req, res, next) => {
    const { userId } = req.params;

    const user = (await UserService.findByField({ _id: userId }))[0];

    if (!user) {
        throw new CustomError.NotFoundError("User not found!");
    }

    const { username, roles } = req.body;
    const updateInfo = { username, roles };

    if (req.files && req.files.profilePicture) {
        if (user.profilePicture !== process.env.DEFAULT_PROFILE_PICTURE) {
            clearImage(user.profilePicture);
        }
        updateInfo.profilePicture = req.files.profilePicture[0].filename;
    }

    await UserService.updateUser(userId, {
        $set: updateInfo,
    });

    res.status(StatusCodes.OK).json({
        message: "Account updated!",
    });
});

UserController.deleteUser = wrapAsync(async (req, res, next) => {
    const { userId } = req.params;

    if (!(await UserService.isExist(userId))) {
        throw new CustomError.NotFoundError("User not found!");
    }

    await UserService.deleteUser(userId);

    res.status(StatusCodes.OK).json({
        message: "User deleted!",
    });
});

UserController.getUser = wrapAsync(async (req, res, next) => {
    const { userId } = req.params;

    const user = (await UserService.findByField({ _id: userId }))[0];

    if (!user) {
        throw new CustomError.NotFoundError("User not found!");
    }

    const shUser = shortUser(user);

    res.status(StatusCodes.OK).json({
        message: `user ${userId}`,
        user: { ...shUser, posts: undefined },
    });
});

module.exports = UserController;
