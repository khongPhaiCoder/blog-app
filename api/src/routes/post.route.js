const router = require("express").Router();

const PostController = require("../controllers/post.controller");
const PostMiddleware = require("../middleware/post.middleware");
const requestValidation = require("../middleware/request-validation.middleware");

router
    .route("/")
    .get(PostController.getPostList)
    .post(
        PostMiddleware.bodyNewAndUpdatePostValidation,
        requestValidation,
        PostController.newPost
    );

router
    .route("/:postId")
    .all(PostMiddleware.paramsValidation, requestValidation)
    .get(PostController.getPost)
    .put(
        PostMiddleware.bodyNewAndUpdatePostValidation,
        requestValidation,
        PostController.updatePost
    )
    .delete(PostController.deletePost);

router.post(
    "/:postId/react",
    PostMiddleware.reactValidation,
    requestValidation,
    PostController.reactPost
);

module.exports = router;
