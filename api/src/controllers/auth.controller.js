const { StatusCodes } = require("http-status-codes");

const UserService = require("../services/user.service");
const wrapAsync = require("../utils/wrap-async");
const CustomError = require("../errors/index");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { createJWT } = require("../utils/jwt");
const { shortUser } = require("../utils/short-object");

const AuthController = {};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
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

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
AuthController.login = wrapAsync(async (req, res, next) => {
    const { email, password, admin } = req.body;

    const user = await UserService.findByEmail(email);

    if (!user) {
        throw new CustomError.UnauthenticatedError(
            "Email or password incorrect!"
        );
    }

    if (!(await comparePassword(password, user.password))) {
        throw new CustomError.UnauthenticatedError("Incorrect password!");
    }

    if (!!admin) {
        const roles = user.roles.map((item) => item.name);

        if (!roles.includes("ADMIN")) {
            throw new CustomError.UnauthorizedError(
                "Unauthorized to access this route"
            );
        }
    }

    const token = createJWT({
        id: user._id.toString(),
        email: user.email,
        roles: user.roles.map((item) => item.name),
    });

    res.status(StatusCodes.OK).json({
        message: "Login successfully",
        user: {
            ...shortUser(user),
            posts: undefined,
            token: token,
        },
    });
});

module.exports = AuthController;
