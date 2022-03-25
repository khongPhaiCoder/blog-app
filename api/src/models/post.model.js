const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        writer: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        content: {
            type: String,
            required: true,
        },
        images: [
            {
                type: String,
            },
        ],
        category: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Category",
            },
        ],
        likes: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
        ],
        dislike: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
