const { getSqlData } = require("../routes/helper");

module.exports.getAll = async (req, res, next) => {
  const postId = req.params.postId;
  console.log("comments id ==", postId);

  const sql = "SELECT * FROM post_comments WHERE post_id=?";
  const [commentsArr, error] = await getSqlData(sql, [postId]);
  if (error) {
    return next(error);
  }
  // if (commentsArr.length === 1) {
  //   res.json(commentsArr[0]);
  //   return;
  // }
  if (commentsArr.length === 0) {
    next({ message: "Post not found", status: 404 });
    return;
  }
  res.status(200).json(commentsArr);
};

module.exports.create = async (req, res, next) => {
  const { author, comment, post_id } = req.body;
  console.log(req.body);
  const sql = `
        INSERT INTO post_comments (author, comment, post_id)
        VALUES (?, ?, ?)
        `;
  const [commentsArr, error] = await getSqlData(sql, [
    author,
    comment,
    post_id,
  ]);
  if (error) {
    return next(error);
  }
  res.json(commentsArr);
};
