const mongoose = require("mongoose");

const PostService = require("../services/post.service");

const CommentSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        post: {
            type: mongoose.Types.ObjectId,
            ref: "Post",
        },
        replies: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Comment",
            },
        ],
        content: {
            type: String,
            required: true,
        },
        like: [
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

CommentSchema.post("save", (error, doc, next) => {
    console.log(doc);
});

module.exports = mongoose.model("Comment", CommentSchema);
