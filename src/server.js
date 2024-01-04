require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// const mysql = require("mysql2/promise");
// const { dbConfig } = require("./config");
const postRouter = require("./routes/postRoutes");
const booksRouter = require("./routes/booksRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const authRouter = require("./routes/authRoutes");

const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/", postRouter);
app.use("/", booksRouter);
app.use("/", categoryRouter);
app.use("/", authRouter);

//error handling, turi butinai buti po routu

app.use((err, req, res, next) => {
  console.log("<<<< error handling >>>>");
  console.log("err", err);

  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }
  switch (err.code) {
    case "ER_DUP_ENTRY":
      res.status(400);
      res.json({ msg: "Email already in use" });
      break;
    case "ER_NO_SUCH_TABLE":
      res.status(400);
      res.json({ msg: "No such table" });
      break;
    default:
      res.status(500);
      res.json("Server error (error handling)");
      break;
  }
  // if (err.errno === 1146) {
  //   return res.status(400).json({
  //     error: "no such table",
  //   });
  // }

  // res.status(500);
  // res.json("Server error (error handling)");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
