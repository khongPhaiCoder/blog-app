const CategoryModel = require("../models/category.model");

const CategoryService = {};

CategoryService.newCategory = async (payload) => {
    const category = new CategoryModel(payload);
    return await category.save();
};

CategoryService.updateCategory = async (id, payload) => {
    return await CategoryModel.findByIdAndUpdate(id, {
        $set: payload,
    });
};

CategoryService.findByField = async (payload, userId) => {
    return await CategoryModel.find(payload)
        .select("-updatedAt -createdAt -__v")
        .cache({ key: userId });
};

CategoryService.isExist = async (id) => {
    return await CategoryModel.exists({ _id: id });
};

CategoryService.deleteCategory = async (id) => {
    return await CategoryModel.findByIdAndDelete(id);
};

module.exports = CategoryService;
