const mongoose = require("mongoose");
const UserService = require("../services/user.service");
const clearImage = require("../utils/clear-image");

const PostSchema = new mongoose.Schema(
    {
        author: {
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
    await UserService.updateUser(doc.author, {
        $push: { posts: doc._id.toString() },
    });
});

PostSchema.post("findOneAndDelete", async (doc) => {
    if (doc.images) {
        for (let item of doc.images) {
            clearImage(item);
        }
    }
    await UserService.updateUser(doc.author, {
        $pull: { posts: doc._id.toString() },
    });
});

module.exports = mongoose.model("Post", PostSchema);
