const router = require("express").Router();

const CommentController = require("../controllers/comment.controller");
const CommentMiddleware = require("../middleware/comment.middleware");
const requestValidation = require("../middleware/request-validation.middleware");
const authenticationMiddleware = require("../middleware/authentication.middleware");

router.post(
    "/",
    authenticationMiddleware.authenticateUser,
    authenticationMiddleware.authorizePrivatePermissions,
    CommentMiddleware.bodyNewCommentValidation,
    requestValidation,
    CommentController.newComment
);

router
    .route("/:commentId")
    .all(
        authenticationMiddleware.authenticateUser,
        authenticationMiddleware.authorizePrivatePermissions,
        CommentMiddleware.paramValidation,
        requestValidation
    )
    .put(
        CommentMiddleware.bodyUpdateValidation,
        requestValidation,
        CommentController.updateComment
    )
    .delete(CommentController.deleteComment);

router.post(
    "/:commentId/react",
    authenticationMiddleware.authenticateUser,
    authenticationMiddleware.authorizePrivatePermissions,
    CommentMiddleware.reactValidation,
    requestValidation,
    CommentController.reactComment
);

module.exports = router;
