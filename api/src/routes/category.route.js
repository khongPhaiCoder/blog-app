const router = require("express").Router();

const CategoryController = require("../controllers/category.controller");
const CategoryMiddleware = require("../middleware/category.middleware");
const requestValidation = require("../middleware/request-validation.middleware");
const authenticationMiddleware = require("../middleware/authentication.middleware");
const cleanCache = require("../middleware/clean-cache.middleware");

router
    .route("/")
    .all(authenticationMiddleware.authenticateUser)
    .get(CategoryController.getCategories)
    .post(
        authenticationMiddleware.adminPermissions,
        CategoryMiddleware.bodyNewCategoryValidation,
        requestValidation,
        cleanCache,
        CategoryController.newCategory
    );

module.exports = router;
