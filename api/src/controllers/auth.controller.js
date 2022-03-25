const { StatusCodes } = require("http-status-codes");

const UserService = require("../services/user.service");
const wrapAsync = require("../utils/wrap-async");
const { hashPassword } = require("../utils/bcrypt");

const AuthController = {};

AuthController.register = wrapAsync(async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = await hashPassword(password);

    const user = await UserService.newUser({
        username,
        email,
        password: hashedPassword,
    });

    res.status(StatusCodes.CREATED).json({
        message: "Sign up successfully.",
        user_id: user._id.toString(),
    });
});

module.exports = AuthController;
