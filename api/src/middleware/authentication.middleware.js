const wrapAsync = require("../utils/wrap-async");
const CustomError = require("../errors/index");
const { decodedJWTToken } = require("../utils/jwt");

const authenticationMiddleware = {};

authenticationMiddleware.authenticateUser = wrapAsync((req, res, next) => {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
        throw new CustomError.UnauthenticatedError("Not authenticated!");
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = decodedJWTToken(token);

    if (!decodedToken) {
        throw new CustomError.UnauthenticatedError("Not authenticated!");
    }

    req.userId = decodedToken.id;
    req.roles = decodedToken.roles;

    next();
});

authenticationMiddleware.authorizePermissions = wrapAsync((req, res, next) => {
    if (!req.userId && !req.roles.includes("ADMIN")) {
        throw new CustomError.UnauthorizedError(
            "Unauthorized to access this route"
        );
    }
    next();
});

authenticationMiddleware.authorizePrivatePermissions = wrapAsync(
    (req, res, next) => {
        if (!req.userId) {
            throw new CustomError.UnauthorizedError(
                "Unauthorized to access this route"
            );
        }
        next();
    }
);

authenticationMiddleware.adminPermissions = wrapAsync((req, res, next) => {
    if (!req.roles.includes("ADMIN")) {
        throw new CustomError.UnauthorizedError(
            "Unauthorized to access this route"
        );
    }
    next();
});

module.exports = authenticationMiddleware;
