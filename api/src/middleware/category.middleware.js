const { body } = require("express-validator");

const CategoryMiddleware = {};

CategoryMiddleware.bodyNewCategoryValidation = [
    body("category").not().isEmpty(),
];

module.exports = CategoryMiddleware;
