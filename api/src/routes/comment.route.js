const router = require("express").Router();

const CommentController = require("../controllers/comment.controller");
const CommentMiddleware = require("../middleware/comment.middleware");
const requestValidation = require("../middleware/request-validation.middleware");
const authenticationMiddleware = require("../middleware/authentication.middleware");
const cleanCache = require("../middleware/clean-cache.middleware");

router.post(
    "/",
    authenticationMiddleware.authenticateUser,
    authenticationMiddleware.authorizePrivatePermissions,
    CommentMiddleware.bodyNewCommentValidation,
    requestValidation,
    cleanCache,
    CommentController.newComment
);

router
    .route("/:commentId")
    .all(
        authenticationMiddleware.authenticateUser,
        authenticationMiddleware.authorizePermissions,
        CommentMiddleware.paramValidation,
        requestValidation
    )
    .put(
        CommentMiddleware.bodyUpdateValidation,
        requestValidation,
        cleanCache,
        CommentController.updateComment
    )
    .delete(cleanCache, CommentController.deleteComment);

router.post(
    "/:commentId/react",
    authenticationMiddleware.authenticateUser,
    authenticationMiddleware.authorizePrivatePermissions,
    CommentMiddleware.reactValidation,
    requestValidation,
    cleanCache,
    CommentController.reactComment
);

module.exports = router;
