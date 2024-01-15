const { getSqlData } = require("../routes/helper");

module.exports.getAll = async (req, res) => {
  // const sql = "SELECT * FROM `posts`";
  const sql = `SELECT posts.post_id, posts.title, posts.author, posts.content, posts.date,  COUNT(post_comments.comm_id) AS commentCount,
    categories.title AS catagoryName
    FROM posts
    JOIN categories
    ON posts.cat_id=categories.cat_id
    LEFT JOIN post_comments
    ON post_comments.post_id=posts.post_id
    GROUP BY posts.post_id`;
  const [postArr, error] = await getSqlData(sql);
  if (error) {
    // console.log(error);
    // res.status(500).json("something wrong");
    // return;
    return next(error);
  }
  console.log(postArr);
  res.json(postArr);
  // let connection;
  // try {
  //   // prisijungiam
  //   connection = await mysql.createConnection(dbConfig);
  //   // atlikti veiksma
  //   const [rows, fields] = await connection.query("SELECT * FROM `posts`");
  //   res.json(rows);
  //   // atsijungiam
  //   // connection.end();
  // } catch (error) {
  //   console.warn(error);
  //   res.status(500).json("something wrong");
  // } finally {
  //   //atsijungiam
  //   // if(connection) connection.end()
  //   connection?.end();
  // }
};

module.exports.getSingle = () => {};
module.exports.delete = () => {};

module.exports.create = () => {};

// module.exports = {
//   getAll,
//   getSingle,
//   deletePost,
//   create,
// };
