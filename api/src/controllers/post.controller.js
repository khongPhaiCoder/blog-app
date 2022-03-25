const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");
const PostService = require("../services/post.service");
const UserService = require("../services/user.service");
const wrapAsync = require("../utils/wrap-async");

const PostController = {};

PostController.newPost = wrapAsync(async (req, res, next) => {
    const { author, content, categories } = req.body;

    if (!(await UserService.isExist(author))) {
        throw new CustomError.NotFoundError(`Author ${author} not found!`);
    }

    const post = await PostService.newPost({
        author: author,
        content: content,
        categories: categories,
    });

    await UserService.addPost(author, post._id);

    res.status(StatusCodes.CREATED).json({
        message: "Post created!",
        post_id: post._id.toString(),
    });
});

module.exports = PostController;
