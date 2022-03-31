const { StatusCodes } = require("http-status-codes");

const PostService = require("../services/post.service");
const clearImage = require("../utils/clear-image");
const { shortPost } = require("../utils/short-object");
const wrapAsync = require("../utils/wrap-async");

const PostController = {};

PostController.newPost = wrapAsync(async (req, res, next) => {
    const { author, title, content, categories } = req.body;

    let images = [];
    if (req.files && req.files.postImages) {
        images = req.files.postImages.map((item) => item.filename);
    }

    const post = await PostService.newPost({
        author: author,
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

PostController.getPost = wrapAsync(async (req, res, next) => {
    const { postId } = req.params;

    const post = (await PostService.findByField({ _id: postId }))[0];

    const shPost = shortPost(post);

    res.status(StatusCodes.OK).json({
        message: "Get post",
        post: shPost,
    });
});

PostController.deletePost = wrapAsync(async (req, res, next) => {
    const { postId } = req.params;

    await PostService.deletePost(postId);

    res.status(StatusCodes.OK).json({
        message: "Post deleted!",
    });
});

PostController.updatePost = wrapAsync(async (req, res, next) => {
    const { postId } = req.params;

    const post = (await PostService.findByField({ _id: postId }))[0];

    const postImage = post._doc.images;

    const { author, content, categories } = req.body;
    let images = [];
    if (req.files && req.files.postImages) {
        images = req.files.postImages.map((item) => item.filename);
    }

    await PostService.updatePost(postId, {
        author: author,
        content: content,
        categories: categories,
        images: images,
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

PostController.getPostList = wrapAsync(async (req, res, next) => {
    const { q = "", page = 1 } = req.params;
    const posts = await PostService.getPostList(q, page);

    res.status(StatusCodes.OK).json({
        message: "Get post list",
        posts: posts,
    });
});

module.exports = PostController;
