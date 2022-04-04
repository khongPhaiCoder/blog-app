const router = require("express").Router();

const PostController = require("../controllers/post.controller");
const PostMiddleware = require("../middleware/post.middleware");
const requestValidation = require("../middleware/request-validation.middleware");
const authenticationMiddleware = require("../middleware/authentication.middleware");
const cleanCache = require("../middleware/clean-cache.middleware");

router
    .route("/")
    .get(PostController.getPostList)
    .post(
        authenticationMiddleware.authenticateUser,
        authenticationMiddleware.authorizePermissions,
        PostMiddleware.bodyNewAndUpdatePostValidation,
        requestValidation,
        cleanCache,
        PostController.newPost
    );

router
    .route("/:postId")
    .all(PostMiddleware.paramsValidation, requestValidation)
    .get(PostController.getPost)
    .all(
        authenticationMiddleware.authenticateUser,
        authenticationMiddleware.authorizePermissions,
        PostMiddleware.paramsValidation,
        requestValidation
    )
    .put(
        PostMiddleware.bodyNewAndUpdatePostValidation,
        requestValidation,
        cleanCache,
        PostController.updatePost
    )
    .delete(cleanCache, PostController.deletePost);

router.post(
    "/:postId/react",
    authenticationMiddleware.authenticateUser,
    authenticationMiddleware.authorizePrivatePermissions,
    PostMiddleware.reactValidation,
    requestValidation,
    cleanCache,
    PostController.reactPost
);

module.exports = router;
