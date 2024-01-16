const express = require("express");
const { getSqlData } = require("./helper");
const { authorizeToken } = require("../middleware");
const commentsController = require("../controllers/commentsController");

const commentsRouter = express.Router();

commentsRouter.get(
  "/api/comments/post/:postId",
  //   authorizeToken,
  commentsController.getPostComment
);

commentsRouter.post(
  "/api/comments/post",
  authorizeToken,
  commentsController.createPostComment
);

module.exports = commentsRouter;
