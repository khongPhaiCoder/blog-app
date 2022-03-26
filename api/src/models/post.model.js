const mongoose = require("mongoose");

const UserService = require("../services/user.service");
const clearImage = require("../utils/clear-image");

const PostSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
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
        categories: [
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
        views: {
            type: Number,
            default: 0,
        },
        comments: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    { timestamps: true }
);

PostSchema.post("save", async (doc) => {
    await UserService.addPost(doc.author, doc._id);
});

PostSchema.post("findOneAndDelete", async (doc) => {
    if (doc.images) {
        for (let item of doc.images) {
            clearImage(item);
        }
    }
    await UserService.removePost(doc.author, doc._id);
});

module.exports = mongoose.model("Post", PostSchema);
