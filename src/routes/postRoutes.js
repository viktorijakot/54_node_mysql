const express = require("express");
const { authorizeToken, validatePostBody } = require("../middleware");
const postController = require("../controllers/postController");

const postRouter = express.Router();
// GET /api/posts - get all posts
// SELECT * FROM `posts`

postRouter.get("/api/posts", authorizeToken, postController.getAll);
//routas tik autorizuotiem vartotojam

postRouter.get("/api/posts/:postId", authorizeToken, postController.getSingle);

//delete

postRouter.delete("/api/posts/:postId", authorizeToken, postController.delete);

//POST /api/posts - sukuria nauja posta

postRouter.post(
  "/api/posts",
  authorizeToken,
  validatePostBody,
  postController.create
);

module.exports = postRouter;
