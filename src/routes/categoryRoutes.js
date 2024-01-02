const express = require("express");
const { getSqlData } = require("./helper");

const categoryRouter = express.Router();

categoryRouter.get("/api/categories", async (req, res) => {
  const sql = "SELECT * FROM `categories`";
  const [catArr, error] = await getSqlData(sql);
  if (error) {
    console.log(error);
    res.status(500).json("something wrong");
    return;
  }
  console.log(catArr);
  res.json(catArr);
});

module.exports = categoryRouter;
