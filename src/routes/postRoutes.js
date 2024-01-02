const express = require("express");
const mysql = require("mysql2/promise");
const { dbConfig } = require("../config");

const postRouter = express.Router();
// GET /api/posts - get all posts
// SELECT * FROM `posts`

postRouter.get("/api/posts", async (req, res) => {
  let connection;
  try {
    // prisijungiam
    connection = await mysql.createConnection(dbConfig);
    // atlikti veiksma
    const [rows, fields] = await connection.query("SELECT * FROM `posts`");
    res.json(rows);
    // atsijungiam
    // connection.end();
  } catch (error) {
    console.warn(error);
    res.status(500).json("something wrong");
  } finally {
    //atsijungiam
    // if(connection) connection.end()
    connection?.end();
  }
});

postRouter.get("/api/posts/:postId", async (req, res) => {
  let connection;
  const postId = req.params.postId;
  try {
    connection = await mysql.createConnection(dbConfig);
    // const [rows, fields] = await connection.query("SELECT * FROM `posts`");
    // const post = rows.find((rObj) => rObj.post_id === postId);
    // ?, kad nenulauztu, kai kintamaji naudojam
    const sql = "SELECT * FROM posts WHERE post_id=?";
    const [rows] = await connection.execute(sql, [postId]);

    //radom viena irasa
    if (rows.length === 1) {
      res.json(rows[0]);
      return;
    }
    //radom daugiau nei viena, neradom nei vieno
    res.json(rows);
    // res.status(400).json(post);
  } catch (error) {
    console.warn("/api/posts", error);
    res.status(500).json("something wrong");
  } finally {
    connection?.end();
  }
});

//delete

postRouter.delete("/api/posts/:postId", async (req, res) => {
  let connection;
  const postId = req.params.postId;
  try {
    connection = await mysql.createConnection(dbConfig);
    const sql = "DELETE FROM posts WHERE post_id=?";
    const [rows] = await connection.execute(sql, [postId]);
    if (rows.affectedRows === 1) {
      res.json({ msg: `post with id ${postId} was deleted` });
      return;
    }
    res.status(400).json({ msg: `no rows affected`, rows });
  } catch (error) {
    console.warn("/api/posts", error);
    res.status(500).json("something wrong");
  } finally {
    connection?.end();
  }
});

//POST /api/posts - sukuria nauja posta

postRouter.post("/api/posts", async (req, res) => {
  const { title, author, date, content } = req.body;

  //validation

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const sql = `
      INSERT INTO posts (title, author, date, content)
      VALUES (?, ?, ?, ?)
      `;
    const [rowObj] = await connection.execute(sql, [
      title,
      author,
      date,
      content,
    ]);
    res.json(rowObj);
  } catch (error) {
    console.warn("/api/posts", error);
    res.status(500).json("something wrong");
  } finally {
    connection?.end();
  }
  // res.json("sukurti");
});

module.exports = postRouter;
