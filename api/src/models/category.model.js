const mongoose = require("mongoose");
const CustomError = require("../errors");

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

CategorySchema.pre("save", function (next) {
    this.name =
        this.name.trim().charAt(0).toUpperCase() +
        this.name.slice(1).toLowerCase();
    next();
});

CategorySchema.post("save", (error, doc, next) => {
    if (
        error.name === "MongoServerError" &&
        error.code === 11000 &&
        error.keyPattern.name === 1
    ) {
        next(new CustomError.BadRequestError("Category already exist!"));
    } else {
        next(error);
    }
});

module.exports = mongoose.model("Category", CategorySchema);
