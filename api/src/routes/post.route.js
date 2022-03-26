const router = require("express").Router();

const PostController = require("../controllers/post.controller");
const PostMiddleware = require("../middleware/post.middleware");
const requestValidation = require("../middleware/request-validation.middleware");
const authenticationMiddleware = require("../middleware/authentication.middleware");

router
    .route("/")
    .get(PostController.getPostList)
    .post(
        authenticationMiddleware.authenticateUser,
        authenticationMiddleware.authorizePermissions,
        PostMiddleware.bodyNewAndUpdatePostValidation,
        requestValidation,
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
        PostController.updatePost
    )
    .delete(PostController.deletePost);

router.post(
    "/:postId/react",
    authenticationMiddleware.authenticateUser,
    authenticationMiddleware.authorizePrivatePermissions,
    PostMiddleware.reactValidation,
    requestValidation,
    PostController.reactPost
);

module.exports = router;
