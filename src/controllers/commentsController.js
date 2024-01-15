const { getSqlData } = require("../routes/helper");

module.exports.getPostComment = async (req, res, next) => {
  const postId = req.params.postId;
  console.log("comments id ==", postId);

  const sql = "SELECT * FROM post_comments WHERE post_id=?";
  const [commentsArr, error] = await getSqlData(sql, [postId]);
  if (error) {
    console.log("getPostComments error ===", error);
    return next({ message: "System error", status: 500 });
  }
  // if (commentsArr.length === 1) {
  //   res.json(commentsArr[0]);
  //   return;
  // }
  //   if (commentsArr.length === 0) {
  //     next({ message: "Post not found", status: 404 });
  //     return;
  //   }
  res.json(commentsArr);
};

module.exports.createPostComment = async (req, res, next) => {
  //   const {postId} = req.params
  //   const sql = `
  //         INSERT INTO post_comments (author, comment, post_id)
  //         VALUES (?, ?, ?)
  //         `;
  //  const { author, comment} = req.body;

  //   const [commentsObj, error] = await getSqlData(sql, [
  //     author,
  //     comment,
  //     post_id,
  //   ]);
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
  if (commentsArr.affectedRows === 1) {
    res.status(201).json({ msg: "success", comm_id: commentsArr.insertId });
    return;
  }
  next(commentsArr);
  //   res.json(commentsArr);
};
