const mongoose = require("mongoose");

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

module.exports = mongoose.model("User", UserSchema);
