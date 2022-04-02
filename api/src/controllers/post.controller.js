const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const PostService = require("../services/post.service");
const clearImage = require("../utils/clear-image");
const { shortPost } = require("../utils/short-object");
const wrapAsync = require("../utils/wrap-async");

const PostController = {};

// @desc    Create new post
// @route   POST /api/post
// @access  Private
PostController.newPost = wrapAsync(async (req, res, next) => {
    const { title, content, categories } = req.body;

    let images = [];
    if (req.files && req.files.postImages) {
        images = req.files.postImages.map((item) => item.filename);
    }

    const post = await PostService.newPost({
        author: req.userId,
        title: title,
        content: content,
        categories: categories,
        images: images,
    });

    res.status(StatusCodes.CREATED).json({
        message: "Post created!",
        post_id: post._id.toString(),
    });
});

// @desc    Find post by id
// @route   GET /api/post/:postId
// @access  Public
PostController.getPost = wrapAsync(async (req, res, next) => {
    const { postId } = req.params;

    const post = (await PostService.findByField({ _id: postId }))[0];

    const shPost = shortPost(post);

    res.status(StatusCodes.OK).json({
        message: "Get post",
        post: shPost,
    });
});

// @desc    Delete a post
// @route   DELETE /api/post/:postId
// @access  Private
PostController.deletePost = wrapAsync(async (req, res, next) => {
    const { postId } = req.params;

    const post = (await PostService.findByField({ _id: postId }))[0];

    if (
        !req.roles.includes("ADMIN") &&
        req.userId !== post._doc.author.toString()
    ) {
        throw new CustomError.UnauthorizedError(
            "Unauthorized to access this route"
        );
    }

    await PostService.deletePost(postId);

    res.status(StatusCodes.OK).json({
        message: "Post deleted!",
    });
});

// @desc    Update a post
// @route   PUT /api/post/:postId
// @access  Private
PostController.updatePost = wrapAsync(async (req, res, next) => {
    const { postId } = req.params;

    const post = (await PostService.findByField({ _id: postId }))[0];

    const postImage = post._doc.images;

    const { title, content, categories } = req.body;
    let images = [];
    if (req.files && req.files.postImages) {
        images = req.files.postImages.map((item) => item.filename);
    }

    await PostService.updatePost(postId, {
        author: req.userId,
        title: title,
        content: content,
        categories: categories,
        images: images,
    });

    postImage.map((item) => clearImage(item));

    res.status(StatusCodes.OK).json({
        message: "Post updated",
    });
});

// @desc    React a post (like/dislike)
// @route   POST /api/post/:postId/react?react=like|dislike
// @access  Private
PostController.reactPost = wrapAsync(async (req, res, next) => {
    const { react } = req.query;
    const { postId } = req.params;

    const post = (await PostService.findByField({ _id: postId }))[0];
    const userId = req.userId;

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

// @desc    Find post list, filter by query(q) and page
// @route   GET /api/post?q=''&page=1
// @access  Public
PostController.getPostList = wrapAsync(async (req, res, next) => {
    const { q, page } = req.query;
    const posts = await PostService.getPostList(q, page);

    res.status(StatusCodes.OK).json({
        message: "Get post list",
        posts: posts,
    });
});

module.exports = PostController;
