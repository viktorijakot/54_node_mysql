require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// GET /api/posts - get all posts
// SELECT * FROM `posts`

app.get("/api/posts", async (req, res) => {
  try {
    // prisijungiam
    const connection = await mysql.createConnection({
      database: "bit_main",
      host: "localhost",
      user: "root",
      password: "root",
      port: "8889",
    });
    // atlikti veiksma
    const [rows, fields] = await connection.query("SELECT * FROM `posts`");
    res.json(rows);
    // atsijungiam
    connection.end();
  } catch (error) {
    console.warn(error);
    res.status(500).json("something wrong");
  }
});

app.get("/api/posts/:postId", async (req, res) => {
  const postId = +req.params.postId;
  try {
    const connection = await mysql.createConnection({
      database: "bit_main",
      host: "localhost",
      user: "root",
      password: "root",
      port: "8889",
    });
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
