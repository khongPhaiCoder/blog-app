const CategoryModel = require("../models/category.model");

const CategoryService = {};

CategoryService.newCategory = async (payload) => {
    const category = new CategoryModel(payload);
    return await category.save();
};

CategoryService.findByField = async (payload) => {
    return await CategoryModel.find(payload);
};

module.exports = CategoryService;
