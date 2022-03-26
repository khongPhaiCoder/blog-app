const mongoose = require("mongoose");

const CustomError = require("../errors/index");
const clearImage = require("../utils/clear-image");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            immutable: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        profilePicture: {
            type: String,
            default: process.env.DEFAULT_PROFILE_PICTURE,
        },
        posts: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Post",
            },
        ],
        roles: {
            type: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: "Role",
                },
            ],
            default: [mongoose.Types.ObjectId(process.env.DEFAULT_ROLE_ID)],
        },
    },
    { timestamps: true }
);

UserSchema.post("save", (error, doc, next) => {
    if (
        error.name === "MongoServerError" &&
        error.code === 11000 &&
        error.keyPattern.email === 1
    ) {
        next(new CustomError.BadRequestError("Email already exist!"));
    } else {
        next(error);
    }
});

UserSchema.post("findOneAndDelete", (doc) => {
    if (
        doc.profilePicture &&
        doc.profilePicture !== process.env.DEFAULT_PROFILE_PICTURE
    ) {
        clearImage(doc.profilePicture);
    }
});

module.exports = mongoose.model("User", UserSchema);
