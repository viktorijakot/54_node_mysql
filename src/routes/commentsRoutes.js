const express = require("express");
const { getSqlData } = require("./helper");
const { authorizeToken } = require("../middleware");
const commentsController = require("../controllers/commentsController");

const commentsRouter = express.Router();

commentsRouter.get(
  "/api/comments/:postId",
  authorizeToken,
  commentsController.getAll
);

commentsRouter.post("/api/comments", commentsController.create);

module.exports = commentsRouter;
