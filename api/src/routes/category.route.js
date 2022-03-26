const router = require("express").Router();
const CategoryController = require("../controllers/category.controller");
const CategoryMiddleware = require("../middleware/category.middleware");
const requestValidation = require("../middleware/request-validation.middleware");

router
    .route("/")
    .get(CategoryController.getCategories)
    .post(
        CategoryMiddleware.bodyNewCategoryValidation,
        requestValidation,
        CategoryController.newCategory
    );

module.exports = router;