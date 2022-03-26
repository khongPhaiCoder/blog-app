const { StatusCodes } = require("http-status-codes");

const UserService = require("../services/user.service");
const wrapAsync = require("../utils/wrap-async");
const CustomError = require("../errors/index");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { createJWT } = require("../utils/jwt");
const { shortUser } = require("../utils/short-object");

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

AuthController.login = wrapAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = (await UserService.findByField({ email: email }))[0];

    if (!user) {
        throw new CustomError.UnauthenticatedError(
            "Email or password incorrect!"
        );
    }

    if (!(await comparePassword(password, user.password))) {
        throw new CustomError.UnauthenticatedError("Incorrect password!");
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
