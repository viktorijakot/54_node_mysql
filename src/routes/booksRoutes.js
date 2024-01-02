const express = require("express");
const mysql = require("mysql2/promise");
const { dbConfig } = require("../config");

const booksRouter = express.Router();

const asyncMiddleware = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      console.warn(error);
      res.status(500).json("something wrong");
    }
    // finally {
    //   conn?.end();
    // }
  };
};

booksRouter.get(
  "/api/books",
  asyncMiddleware(async (req, res) => {
    let conn = await mysql.createConnection(dbConfig);
    const sql = "SELECT * FROM `books`";
    const [rows] = await conn.query(sql);

    res.json(rows);
    conn?.end();
  })
);

booksRouter.get(
  "/api/books/:bookId",
  asyncMiddleware(async (req, res) => {
    const { bookId } = req.params;
    let conn = await mysql.createConnection(dbConfig);
    const sql = "SELECT * FROM `books` WHERE book_id=?";
    const [rows] = await conn.execute(sql, [bookId]);

    if (rows.length === 1) {
      res.json(rows[0]);
      return;
    }

    res.json(rows);
    conn?.end();
  })
);

booksRouter.delete(
  "/api/books/:bookId",
  asyncMiddleware(async (req, res) => {
    const { bookId } = req.params;
    let conn = await mysql.createConnection(dbConfig);
    const sql = "DELETE FROM `books` WHERE book_id=?";
    const [rows] = await conn.execute(sql, [bookId]);

    if (rows.affectedRows === 1) {
      res.json({ msg: `book with id ${bookId} was deleted` });
      return;
    }

    res.status(400).json({ msg: `no rows affected`, rows });
    conn?.end();
  })
);

booksRouter.post(
  "/api/books",
  asyncMiddleware(async (req, res) => {
    const { title, author, year } = req.body;
    let conn = await mysql.createConnection(dbConfig);
    const sql = `
    INSERT INTO books (title, author, year)
    VALUES (?, ?, ?)
    `;

    const [rowObj] = await conn.execute(sql, [title, author, year]);
    res.json(rowObj);
    conn?.end();
  })
);

module.exports = booksRouter;
