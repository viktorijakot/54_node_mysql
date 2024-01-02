require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// const mysql = require("mysql2/promise");
// const { dbConfig } = require("./config");
const postRouter = require("./routes/postRoutes");
const booksRouter = require("./routes/booksRoutes");
const categoryRouter = require("./routes/categoryRoutes");

const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/", postRouter);
app.use("/", booksRouter);
app.use("/", categoryRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
