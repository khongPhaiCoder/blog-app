const { StatusCodes } = require("http-status-codes");

const CustomError = require("../errors/index");
const PostService = require("../services/post.service");
const UserService = require("../services/user.service");
const clearImage = require("../utils/clear-image");
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

PostController.deletePost = wrapAsync(async (req, res, next) => {
    const { postId } = req.params;

    if (!(await PostService.isExist(postId))) {
        throw new CustomError.NotFoundError(`Post ${postId} not found!`);
    }

    await PostService.deletePost(postId);

    res.status(StatusCodes.OK).json({
        message: "Post deleted!",
    });
});

PostController.updatePost = wrapAsync(async (req, res, next) => {
    const { postId } = req.params;

    const post = (await PostService.findByField({ _id: postId }))[0];

    if (!post) {
        throw new CustomError.NotFoundError(`Post ${postId} not found!`);
    }

    const postImage = post._doc.images;

    const { author, content, categories } = req.body;
    let images = [];
    if (req.files && req.files.postImages) {
        images = req.files.postImages.map((item) => item.filename);
    }

    await PostService.updatePost(postId, {
        $set: {
            author: author,
            content: content,
            categories: categories,
            images: images,
        },
    });

    postImage.map((item) => clearImage(item));

    res.status(StatusCodes.OK).json({
        message: "Post updated",
    });
});

PostController.reactPost = wrapAsync(async (req, res, next) => {
    const { react } = req.query;
    const { postId } = req.params;
    const { userId } = req.body;

    const post = (await PostService.findByField({ _id: postId }))[0];

    if (!post) {
        throw new CustomError.NotFoundError(`Post ${postId} not found!`);
    }

    if (!(await UserService.isExist(userId))) {
        throw new CustomError.NotFoundError(`User ${userId} not found!`);
    }

    if (react === "like") {
        if (post._doc.likes.includes(userId)) {
            await PostService.removeLike(postId, userId);
        } else {
            await PostService.addLike(postId, userId);
        }
        if (post._doc.dislike.includes(userId)) {
            await PostService.removeDislike(postId, userId);
        }
    } else {
        if (post._doc.dislike.includes(userId)) {
            await PostService.removeDislike(postId, userId);
        } else {
            await PostService.addDislike(postId, userId);
        }
        if (post._doc.likes.includes(userId)) {
            await PostService.removeLike(postId, userId);
        }
    }

    res.status(StatusCodes.OK).json({
        message: `React to post ${postId} successfully.`,
    });
});

module.exports = PostController;
