require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mysql = require("mysql2/promise");
const { dbConfig } = require("./config");

const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// GET /api/posts - get all posts
// SELECT * FROM `posts`

app.get("/api/posts", async (req, res) => {
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

app.get("/api/posts/:postId", async (req, res) => {
  const postId = +req.params.postId;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows, fields] = await connection.query("SELECT * FROM `posts`");
    const post = rows.find((rObj) => rObj.post_id === postId);
    res.json(post);
    connection.end();
  } catch (error) {
    console.warn("/api/posts", error);
    res.status(500).json("something wrong");
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
