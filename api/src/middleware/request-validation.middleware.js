const { validationResult } = require("express-validator");

const CustomError = require("../errors/index");

const requestValidation = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new CustomError.BadRequestError("Validation failed!");
        error.data = errors.array();
        throw error;
    }

    next();
};

module.exports = requestValidation;
