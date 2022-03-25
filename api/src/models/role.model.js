const mongoose = require("mongoose");
const CustomError = require("../errors/index");

const RoleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
        },
    },
    { timestamps: true }
);

RoleSchema.post("save", function (error, doc, next) {
    if (error.name === "MongoServerError" && error.code === 11000) {
        next(new CustomError.BadRequestError("Role already exist!"));
    } else {
        next(error);
    }
});

module.exports = mongoose.model("Role", RoleSchema);
