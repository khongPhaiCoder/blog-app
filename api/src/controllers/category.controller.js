const { StatusCodes } = require("http-status-codes");

const CategoryService = require("../services/category.service");
const wrapAsync = require("../utils/wrap-async");
const { shortCategory } = require("../utils/short-object");

const CategoryController = {};

CategoryController.newCategory = wrapAsync(async (req, res, next) => {
    const { category } = req.body;
    const nCategory = await CategoryService.newCategory({ name: category });

    res.status(StatusCodes.CREATED).json({
        message: "Category created",
        category_id: nCategory._id.toString(),
    });
});

CategoryController.getCategories = wrapAsync(async (req, res, next) => {
    const categories = await CategoryService.findByField({});
    const shCategories = categories.map((item) => shortCategory(item));

    res.status(StatusCodes.OK).json({
        message: "Get all categories",
        categories: shCategories,
    });
});

module.exports = CategoryController;
