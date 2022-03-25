const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");
const PostService = require("../services/post.service");
const UserService = require("../services/user.service");
const { shortPost } = require("../utils/short-object");
const wrapAsync = require("../utils/wrap-async");

const PostController = {};

PostController.newPost = wrapAsync(async (req, res, next) => {
    const { author, content, categories } = req.body;

    if (!(await UserService.isExist(author))) {
        throw new CustomError.NotFoundError(`Author ${author} not found!`);
    }

    let images = [];
    if (req.files && req.files.postImages) {
        images = req.files.postImages.map((item) => item.filename);
    }

    const post = await PostService.newPost({
        author: author,
        content: content,
        categories: categories,
        images: images,
    });

    res.status(StatusCodes.CREATED).json({
        message: "Post created!",
        post_id: post._id.toString(),
    });
});

PostController.getPost = wrapAsync(async (req, res, next) => {
    const { postId } = req.params;

    const post = (await PostService.findByField({ _id: postId }))[0];

    if (!post) {
        throw new CustomError.NotFoundError("Post not found!");
    }

    const shPost = shortPost(post);

    res.status(StatusCodes.OK).json({
        message: "Get post",
        post: shPost,
    });
});

module.exports = PostController;
