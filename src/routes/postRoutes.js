const express = require("express");
const mysql = require("mysql2/promise");
const { dbConfig } = require("../config");
const { getSqlData } = require("./helper");

const postRouter = express.Router();
// GET /api/posts - get all posts
// SELECT * FROM `posts`

postRouter.get("/api/posts", async (req, res) => {
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
    console.log(error);
    res.status(500).json("something wrong");
    return;
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
});

postRouter.get("/api/posts/:postId", async (req, res) => {
  // let connection;
  const postId = req.params.postId;
  const sql = "SELECT * FROM posts WHERE post_id=?";
  const [postArr, error] = await getSqlData(sql, [postId]);
  if (error) {
    console.log(error);
    res.status(500).json("something wrong");
    return;
  }
  if (postArr.length === 1) {
    res.json(postArr[0]);
    return;
  }
  if (postArr.length === 0) {
    res.status(404).json({ msg: "post not found" });
    return;
  }
  res.status(400).json(postArr);
  // try {
  //   connection = await mysql.createConnection(dbConfig);
  //   // const [rows, fields] = await connection.query("SELECT * FROM `posts`");
  //   // const post = rows.find((rObj) => rObj.post_id === postId);
  //   // ?, kad nenulauztu, kai kintamaji naudojam
  //   const sql = "SELECT * FROM posts WHERE post_id=?";
  //   const [rows] = await connection.execute(sql, [postId]);

  //   //radom viena irasa
  //   if (rows.length === 1) {
  //     res.json(rows[0]);
  //     return;
  //   }
  //   //radom daugiau nei viena, neradom nei vieno
  //   res.json(rows);
  //   // res.status(400).json(post);
  // } catch (error) {
  //   console.warn("/api/posts", error);
  //   res.status(500).json("something wrong");
  // } finally {
  //   connection?.end();
  // }
});

//delete

postRouter.delete("/api/posts/:postId", async (req, res) => {
  // let connection;
  const postId = req.params.postId;
  const sql = "DELETE FROM posts WHERE post_id=? LIMIT 1";
  const [postArr, error] = await getSqlData(sql, [postId]);
  if (error) {
    console.log(error);
    res.status(500).json("something wrong");
    return;
  }
  if (postArr.affectedRows === 1) {
    res.json({ msg: `post with id ${postId} was deleted` });
    return;
  }
  res.status(400).json({ msg: `no rows affected`, postArr });

  // try {
  //   connection = await mysql.createConnection(dbConfig);
  //   const sql = "DELETE FROM posts WHERE post_id=? LIMIT 1";
  //   const [rows] = await connection.execute(sql, [postId]);
  //   if (rows.affectedRows === 1) {
  //     res.json({ msg: `post with id ${postId} was deleted` });
  //     return;
  //   }
  //   res.status(400).json({ msg: `no rows affected`, rows });
  // } catch (error) {
  //   console.warn("/api/posts", error);
  //   res.status(500).json("something wrong");
  // } finally {
  //   connection?.end();
  // }
});

//POST /api/posts - sukuria nauja posta

postRouter.post("/api/posts", async (req, res) => {
  const { title, author, date, content, cat_id: catId } = req.body;
  const sql = `
      INSERT INTO posts (title, author, date, content, cat_id)
      VALUES (?, ?, ?, ?, ?)
      `;
  const [postArr, error] = await getSqlData(sql, [
    title,
    author,
    date,
    content,
    catId,
  ]);
  if (error) {
    console.log(error);
    res.status(500).json("something wrong");
    return;
  }
  res.json(postArr);

  //validation

  // let connection;
  // try {
  //   connection = await mysql.createConnection(dbConfig);
  //   const sql = `
  //     INSERT INTO posts (title, author, date, content, cat_id)
  //     VALUES (?, ?, ?, ?, ?)
  //     `;
  //   const [rowObj] = await connection.execute(sql, [
  //     title,
  //     author,
  //     date,
  //     content,
  //     catId,
  //   ]);
  //   res.json(rowObj);
  // } catch (error) {
  //   console.warn("/api/posts", error);
  //   res.status(500).json("something wrong");
  // } finally {
  //   connection?.end();
  // }
  // // res.json("sukurti");
});

module.exports = postRouter;
