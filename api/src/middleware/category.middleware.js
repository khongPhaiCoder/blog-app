const { body, param } = require("express-validator");
const CustomError = require("../errors");

const CategoryService = require("../services/category.service");

const CategoryMiddleware = {};

CategoryMiddleware.bodyValidation = [body("category").not().isEmpty()];

CategoryMiddleware.paramValidation = [
    param("categoryId")
        .isMongoId()
        .custom(async (value) => {
            if (!(await CategoryService.isExist(value))) {
                throw new CustomError.NotFoundError(
                    `Category ${value} not found!`
                );
            }
            return true;
        }),
];

module.exports = CategoryMiddleware;
