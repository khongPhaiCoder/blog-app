const CategoryModel = require("../models/category.model");

const CategoryService = {};

CategoryService.newCategory = async (payload) => {
    const category = new CategoryModel(payload);
    return await category.save();
};

CategoryService.findByField = async (payload, userId) => {
    return await CategoryModel.find(payload).cache({ key: userId });
};

CategoryService.isExist = async (id) => {
    return await CategoryModel.exists({ _id: id });
};

module.exports = CategoryService;
