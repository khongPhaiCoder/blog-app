const { StatusCodes } = require("http-status-codes");

const CategoryService = require("../services/category.service");
const wrapAsync = require("../utils/wrap-async");

const CategoryController = {};

// @desc    Create new category
// @route   POST /api/category
// @access  Private
CategoryController.newCategory = wrapAsync(async (req, res, next) => {
    const { category } = req.body;
    const nCategory = await CategoryService.newCategory({ name: category });

    res.status(StatusCodes.CREATED).json({
        message: "Category created",
        category_id: nCategory._id.toString(),
    });
});

// @desc    Get all categories
// @route   GET /api/category
// @access  Private
CategoryController.getCategories = wrapAsync(async (req, res, next) => {
    const categories = await CategoryService.findByField({}, req.userId);

    res.status(StatusCodes.OK).json({
        message: "Get all categories",
        categories: categories,
    });
});

// @desc    Update category
// @route   PUT /api/category/:categoryId
// @access  Private/Admin
CategoryController.updateCategory = wrapAsync(async (req, res, next) => {
    const { categoryId } = req.params;
    const { category } = req.body;

    await CategoryService.updateCategory(categoryId, { name: category });

    res.status(StatusCodes.OK).json({
        message: `Category ${categoryId} updated`,
    });
});

// @desc    Delete category
// @route   DELETE /api/category/:categoryId
// @access  Private/Admin
CategoryController.deleteCategory = wrapAsync(async (req, res, next) => {
    const { categoryId } = req.params;

    await CategoryService.deleteCategory(categoryId);

    res.status(StatusCodes.OK).json({
        message: `Category ${categoryId} deleted`,
    });
});

module.exports = CategoryController;
